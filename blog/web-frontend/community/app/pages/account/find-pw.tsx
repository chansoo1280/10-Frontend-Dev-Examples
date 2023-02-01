// #region Global Imports
import React, { createRef, useEffect, useState } from "react"
import { useRouter } from "next/router"

// #endregion Global Imports

// #region Local Imports
import { Input, Space, Text, Row, Button, Icon, AccountForm, FormInput } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { HttpAccount } from "@Services"
import { useHistoryBack } from "@Hooks/useHistoryBack"
import { useQuery } from "react-query"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
// #endregion Local Imports

enum FormState {
    "NONE" = "NONE",
    "PENDING" = "PENDING",
    "EMPTY_EMAIL" = "EMPTY_EMAIL",
    "NONE_USER" = "NONE_USER",
    "FAIL" = "FAIL",
    "SUCCESS" = "SUCCESS",
}
const FormMessage: { [key in FormState]: string } = {
    [FormState.NONE]: "",
    [FormState.PENDING]: "",
    [FormState.EMPTY_EMAIL]: "이메일을 입력해주세요.",
    [FormState.NONE_USER]: "회원정보가 존재하지 않습니다.",
    [FormState.FAIL]: "",
    [FormState.SUCCESS]: "",
}

const FindPw = () => {
    const { historyBack } = useHistoryBack("/account/login")

    const [formState, setFormState] = useState(FormState.NONE)
    const stateNotice = FormMessage[formState]
    const noticeRef = createRef<HTMLHeadingElement>()

    const [email, setEmail] = useState("")

    const sendEmail = async (email: string) =>
        await HttpAccount.sendEmailResetPwPath({ email }).catch((e: ResMessageWithDesc) => {
            console.log(e)
            switch (e.status) {
                case ResStatus.BadRequest:
                    setFormState(FormState.NONE_USER)
                    return null

                default:
                    break
            }
            return null
        })

    const { isLoading, refetch } = useQuery("login", () => sendEmail(email), {
        enabled: false,
    })

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (email === "") {
            setFormState(FormState.EMPTY_EMAIL)
            return
        }
        const { data } = await refetch()
        if (data === null || data === undefined) {
            return
        }
        setFormState(FormState.SUCCESS)
        return
    }

    useEffect(() => {
        if (formState !== FormState.NONE) {
            noticeRef.current?.focus()
        }
    }, [formState])
    useEffect(() => {
        if (isLoading === true) {
            setFormState(FormState.PENDING)
        }
    }, [isLoading])
    return (
        <>
            <AccountForm header="Find Password" onSubmit={handleSubmitLogin}>
                {formState === FormState.SUCCESS ? (
                    <>
                        <Text>발송된 이메일을 확인해주세요.</Text>
                        <Row>
                            <Space.Box></Space.Box>
                            <Button onClick={historyBack} type="link">
                                이전으로
                            </Button>
                        </Row>
                    </>
                ) : (
                    <>
                        <Text>비밀번호 초기화 링크가 전송 됩니다.</Text>
                        <Text show={!!stateNotice} ref={noticeRef} tabIndex={0} widthType="wide" size="small" status="error">
                            {stateNotice}
                        </Text>
                        <FormInput
                            status={formState === FormState.EMPTY_EMAIL ? "error" : "normal"}
                            prefix={<Icon iconName="xi-user-o" />}
                            placeholder="Email"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                        <Row>
                            <Space.Box>
                                <Button loading={formState === FormState.PENDING} htmlType="submit" size="large">
                                    전송
                                </Button>
                            </Space.Box>
                            <Button onClick={historyBack} type="link">
                                이전으로
                            </Button>
                        </Row>
                    </>
                )}
            </AccountForm>
        </>
    )
}
export const getStaticProps = async (): Promise<{
    props: PageProps
}> => ({
    props: {
        layout: Layout.AccountLayout,
    },
})
export default FindPw
