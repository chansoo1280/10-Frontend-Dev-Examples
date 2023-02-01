// #region Global Imports
import React, { createRef, useEffect, useState } from "react"
import { useQuery } from "react-query"
// #endregion Global Imports

// #region Local Imports
import { Space, Text, Checkbox, Button, Icon, AccountForm, Row, FormInput } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { useUser } from "@Hooks/useUser"
import { HttpAccount } from "@Services/API/Account"
import { useHistoryBack, usePrevPath } from "@Hooks/useHistoryBack"
import { setStoredSessionId } from "@Hooks/useAccessToken"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { User } from "@Services/User"
// #endregion Local Imports

enum FormState {
    "NONE" = "NONE",
    "PENDING" = "PENDING",
    "EMPTY_EMAIL" = "EMPTY_EMAIL",
    "EMPTY_PW" = "EMPTY_PW",
    "NONE_USER" = "NONE_USER",
    "FAIL" = "FAIL",
}
const FormMessage: { [key in FormState]: string } = {
    [FormState.NONE]: "",
    [FormState.PENDING]: "",
    [FormState.EMPTY_EMAIL]: "이메일을 입력해주세요.",
    [FormState.EMPTY_PW]: "비밀번호를 입력해주세요.",
    [FormState.NONE_USER]: "회원정보가 존재하지 않습니다.",
    [FormState.FAIL]: "이메일 or 비밀번호가 올바르지 않습니다.",
}

const Login = () => {
    const { historyBack } = useHistoryBack("/community/questionList")
    const { prevPath } = usePrevPath()

    const [formState, setFormState] = useState(FormState.NONE)
    const stateNotice = FormMessage[formState]
    const noticeRef = createRef<HTMLHeadingElement>()

    const [loginInfo, setLoginInfo] = useState<Pick<User, "email" | "password"> & { keepLogin: boolean }>({
        email: "",
        password: "",
        keepLogin: false,
    })

    const { updateUser } = useUser()

    const login = async () =>
        await HttpAccount.login(loginInfo).catch((e: ResMessageWithDesc) => {
            console.log(e)
            switch (e.status) {
                case ResStatus.BadRequest:
                    setFormState(FormState.NONE_USER)
                    return null
                case ResStatus.Forbidden:
                    setFormState(FormState.FAIL)
                    return null

                default:
                    break
            }
            return null
        })

    const { isLoading, refetch } = useQuery("login", () => login(), {
        enabled: false,
    })

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loginInfo.email === "") {
            setFormState(FormState.EMPTY_EMAIL)
            return
        }
        if (loginInfo.password === "") {
            setFormState(FormState.EMPTY_PW)
            return
        }
        const { data } = await refetch()
        if (data === null || data === undefined) {
            return
        }
        if (data.sessionId !== null) {
            setStoredSessionId(data.sessionId)
        }
        updateUser({ ...data, keepLogin: loginInfo.keepLogin })
        historyBack()
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
            <AccountForm header="Login" onSubmit={handleSubmitLogin}>
                <Text show={!!stateNotice} ref={noticeRef} tabIndex={0} widthType="wide" size="small" status="error">
                    {stateNotice}
                </Text>
                <Row direction="vertical">
                    <FormInput
                        status={formState === FormState.NONE_USER || formState === FormState.EMPTY_EMAIL ? "error" : "normal"}
                        inputId="email"
                        label="email"
                        prefix={<Icon iconName="xi-user-o" />}
                        placeholder="Email"
                        type="email"
                        value={loginInfo.email}
                        onChange={(event) => {
                            setLoginInfo({ ...loginInfo, email: event.target.value })
                            if (formState === FormState.NONE_USER || formState === FormState.EMPTY_EMAIL) {
                                setFormState(FormState.NONE)
                            }
                        }}
                    />
                </Row>
                <Row direction="vertical" align="flex-end">
                    <FormInput
                        status={formState === FormState.EMPTY_PW ? "error" : "normal"}
                        inputId="password"
                        label="password"
                        prefix={<Icon iconName="xi-lock-o" />}
                        placeholder="Password"
                        type="password"
                        value={loginInfo.password}
                        onChange={(event) => {
                            setLoginInfo({ ...loginInfo, password: event.target.value })
                            if (formState === FormState.EMPTY_PW) {
                                setFormState(FormState.NONE)
                            }
                        }}
                    />
                    <Button
                        href={{
                            pathname: "/account/find-pw",
                            query: {
                                prevPath,
                            },
                        }}
                        size="small"
                        type="link"
                    >
                        비밀번호를 잊으셨나요?
                    </Button>
                </Row>
                <Checkbox
                    id="keepLogin"
                    checked={loginInfo.keepLogin}
                    onChange={() => {
                        setLoginInfo({ ...loginInfo, keepLogin: !loginInfo.keepLogin })
                    }}
                    label="로그인 유지하기"
                />
                <Row>
                    <Space.Box>
                        <Button loading={formState === FormState.PENDING} htmlType="submit" size="large">
                            로그인
                        </Button>
                    </Space.Box>
                    <Button onClick={historyBack} type="link">
                        이전으로
                    </Button>
                </Row>
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
export default Login
