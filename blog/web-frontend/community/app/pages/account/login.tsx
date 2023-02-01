// #region Global Imports
import React, { createRef, FormEvent, useEffect, useState } from "react"
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

enum LoginState {
    "NONE" = "NONE",
    "PENDING" = "PENDING",
    "NONE_USER" = "NONE_USER",
    "NONE_EMAIL" = "NONE_EMAIL",
    "NONE_PW" = "NONE_PW",
    "ERROR" = "ERROR",
}

const Login = () => {
    const { historyBack } = useHistoryBack("/community/questionList")
    const { prevPath } = usePrevPath()

    const [loginState, setLoginState] = useState(LoginState.NONE)
    const stateNotice =
        loginState === LoginState.NONE_USER
            ? "회원정보가 존재하지 않습니다."
            : loginState === LoginState.NONE_EMAIL
            ? "이메일을 입력해주세요."
            : loginState === LoginState.NONE_PW
            ? "비밀번호를 입력해주세요."
            : loginState === LoginState.ERROR
            ? "이메일 or 비밀번호가 올바르지 않습니다."
            : ""
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
                    setLoginState(LoginState.NONE_USER)
                    return null
                case ResStatus.Forbidden:
                    setLoginState(LoginState.ERROR)
                    return null

                default:
                    break
            }
            return null
        })

    const { isLoading, refetch } = useQuery("login", () => login(), {
        enabled: false,
    })

    const handleSubmitLogin = async (e: FormEvent) => {
        e.preventDefault()
        if (loginInfo.email === "") {
            setLoginState(LoginState.NONE_EMAIL)
            return
        }
        if (loginInfo.password === "") {
            setLoginState(LoginState.NONE_PW)
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
        if (loginState !== LoginState.NONE) {
            noticeRef.current?.focus()
        }
    }, [loginState])
    return (
        <>
            <AccountForm header="Login" onSubmit={handleSubmitLogin}>
                <Text ref={noticeRef} tabIndex={0} widthType="wide" size="small" status="error">
                    {stateNotice}
                </Text>
                <Row direction="vertical">
                    <FormInput
                        status={loginState === LoginState.NONE_USER || loginState === LoginState.NONE_EMAIL ? "error" : "normal"}
                        inputId="email"
                        label="email"
                        prefix={<Icon iconName="xi-user-o" />}
                        placeholder="Email"
                        type="email"
                        value={loginInfo.email}
                        onChange={(event) => {
                            setLoginInfo({ ...loginInfo, email: event.target.value })
                            if (loginState === LoginState.NONE_USER || loginState === LoginState.NONE_EMAIL) {
                                setLoginState(LoginState.NONE)
                            }
                        }}
                    />
                </Row>
                <Row direction="vertical" align="flex-end">
                    <FormInput
                        status={loginState === LoginState.NONE_PW ? "error" : "normal"}
                        inputId="password"
                        label="password"
                        prefix={<Icon iconName="xi-lock-o" />}
                        placeholder="Password"
                        type="password"
                        value={loginInfo.password}
                        onChange={(event) => {
                            setLoginInfo({ ...loginInfo, password: event.target.value })
                            if (loginState === LoginState.NONE_PW) {
                                setLoginState(LoginState.NONE)
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
                        <Button loading={isLoading} htmlType="submit" size="large">
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
