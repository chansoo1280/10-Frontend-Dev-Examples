// #region Global Imports
import React, { createRef, useEffect, useState } from "react"
import { useRouter } from "next/router"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Text, Checkbox, Button, Icon, AccountForm, FormInput, Row } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { HttpAccount } from "@Services"
import { useHistoryBack } from "@Hooks/useHistoryBack"
import { useQuery } from "react-query"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { verifyUser } from "@Services/User/User.entity"
// #endregion Local Imports

enum FormState {
    "NONE" = "NONE",
    "PENDING" = "PENDING",
    "EMPTY_PW" = "EMPTY_PW",
    "WRONG_PW" = "WRONG_PW",
    "EMPTY_PWCOMFIRM" = "EMPTY_PWCOMFIRM",
    "WRONG_PWCOMFIRM" = "WRONG_PWCOMFIRM",
    "FAIL" = "FAIL",
}
const FormMessage: { [key in FormState]: string } = {
    [FormState.NONE]: "",
    [FormState.PENDING]: "",
    [FormState.EMPTY_PW]: "비밀번호를 입력해주세요.",
    [FormState.WRONG_PW]: "잘못된 비밀번호 형식입니다.",
    [FormState.EMPTY_PWCOMFIRM]: "비밀번호 확인값을 입력해주세요.",
    [FormState.WRONG_PWCOMFIRM]: "잘못된 비밀번호 확인값입니다.",
    [FormState.FAIL]: "",
}

const ResetPw = () => {
    const router = useRouter()
    const { historyBack } = useHistoryBack("/account/login")

    const [formState, setFormState] = useState(FormState.NONE)
    const stateNotice = FormMessage[formState]
    const noticeRef = createRef<HTMLHeadingElement>()

    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const resetPw = async () =>
        await HttpAccount.resetPw({
            token: String(router.query.resetPwToken) || "",
            email: String(router.query.email) || "",
            password: password,
        }).catch((e: ResMessageWithDesc) => {
            console.log(e)
            switch (e.status) {
                case ResStatus.BadRequest: {
                    return null
                }

                default:
                    break
            }
            return null
        })

    const { isLoading, refetch } = useQuery("resetPw", () => resetPw(), {
        enabled: false,
    })

    const handleSumbitSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password === "") {
            setFormState(FormState.EMPTY_PW)
            return
        }
        if (passwordConfirm === "") {
            setFormState(FormState.EMPTY_PWCOMFIRM)
            return
        }
        const verifyResult = verifyUser(
            {
                password: password,
            },
            ["password"],
        )
        if (verifyResult !== true) {
            if (verifyResult === "password 형식이 올바르지 않습니다.") {
                setFormState(FormState.WRONG_PW)
            }
            return
        }
        if (password !== passwordConfirm) {
            setFormState(FormState.WRONG_PWCOMFIRM)
            return
        }

        const { data } = await refetch()
        if (data !== null) {
            return
        }
        historyBack()
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
            <AccountForm header="Reset Password" onSubmit={handleSumbitSave}>
                <Text show={!!stateNotice} ref={noticeRef} tabIndex={0} widthType="wide" size="small" status="error">
                    {stateNotice}
                </Text>
                <Row direction="vertical" align="flex-end">
                    <FormInput
                        minLength={8}
                        status={formState === FormState.EMPTY_PW ? "error" : "normal"}
                        inputId="password"
                        label="password"
                        placeholder="Password(6 digits at least, case sensitive)"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                    />
                    <Text size="small">8~20 길이의 영문자, 숫자</Text>
                </Row>
                <FormInput
                    minLength={8}
                    maxLength={20}
                    status={formState === FormState.EMPTY_PWCOMFIRM ? "error" : "normal"}
                    inputId="passwordComfirm"
                    label="passwordComfirm"
                    placeholder="Comfirm password"
                    type="password"
                    value={passwordConfirm}
                    onChange={(event) => {
                        setPasswordConfirm(event.target.value)
                    }}
                />
                <Button loading={formState === FormState.PENDING} htmlType="submit" widthType="wide" size="large">
                    저장
                </Button>
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
export default ResetPw
