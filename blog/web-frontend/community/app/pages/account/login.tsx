// #region Global Imports
import React, { createRef, FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Text, Checkbox, Button, Icon, AccountForm, Row } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { useUser } from "@Hooks/useUser"
import { HttpAccount } from "@Services/API/Account"
import { useHistoryBack, usePrevPath } from "@Hooks/useHistoryBack"
import { setStoredSessionId, useAccessToken } from "@Hooks/useAccessToken"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
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
    const router = useRouter()
    const [loginState, setLoginState] = useState(LoginState.NONE)
    const noticeRef = createRef<HTMLHeadingElement>()
    const [keepLogin, setKeepLogin] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { updateUser } = useUser()

    const { historyBack } = useHistoryBack("/community/questionList")
    const { prevPath } = usePrevPath()

    useEffect(() => {
        console.log("useEffect")
        if (loginState !== LoginState.NONE) {
            noticeRef.current?.focus()
        }
    }, [loginState])

    const handleSubmitLogin = async (e: FormEvent) => {
        e.preventDefault()

        if (email === "") {
            setLoginState(LoginState.NONE_EMAIL)
            return
        }
        if (password === "") {
            setLoginState(LoginState.NONE_PW)
            return
        }

        const result = await HttpAccount.login({ email, password, keepLogin }).catch((e: ResMessageWithDesc) => {
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
        if (result === null) {
            return
        }
        if (result.sessionId !== null) {
            setStoredSessionId(result.sessionId)
        }
        updateUser({ ...result, keepLogin })
        historyBack()
        return
    }
    return (
        <>
            <AccountForm header="Login" onSubmit={handleSubmitLogin}>
                <Text ref={noticeRef} tabIndex={0} widthType="wide" size="small" status="error">
                    {loginState === LoginState.NONE_USER
                        ? "회원정보가 존재하지 않습니다."
                        : loginState === LoginState.NONE_EMAIL
                        ? "이메일을 입력해주세요."
                        : loginState === LoginState.NONE_PW
                        ? "비밀번호를 입력해주세요."
                        : loginState === LoginState.ERROR
                        ? "이메일 or 비밀번호가 올바르지 않습니다."
                        : ""}
                </Text>
                <Row direction="vertical">
                    <Input
                        status={loginState === LoginState.NONE_USER || loginState === LoginState.NONE_EMAIL ? "error" : "normal"}
                        inputId="email"
                        label="email"
                        widthType="wide"
                        size="large"
                        prefix={<Icon iconName="xi-user-o" />}
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                            setEmail(event.target.value)
                            if (loginState === LoginState.NONE_USER || loginState === LoginState.NONE_EMAIL) {
                                setLoginState(LoginState.NONE)
                            }
                        }}
                    />
                </Row>
                <Row direction="vertical" align="flex-end">
                    <Input
                        status={loginState === LoginState.NONE_PW ? "error" : "normal"}
                        inputId="password"
                        label="password"
                        widthType="wide"
                        size="large"
                        prefix={<Icon iconName="xi-lock-o" />}
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
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
                <Row>
                    <Space.Box>
                        <Checkbox
                            id="keepLogin"
                            checked={keepLogin}
                            onChange={() => {
                                setKeepLogin(!keepLogin)
                            }}
                            label="로그인 유지하기"
                        />
                    </Space.Box>
                </Row>
                <Row>
                    <Space.Box>
                        <Button htmlType="submit" size="large">
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
