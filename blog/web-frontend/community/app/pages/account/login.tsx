// #region Global Imports
import React, { FormEvent, useState } from "react"
import { useRouter } from "next/router"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Checkbox, Button, Icon, AccountForm, Row } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { useUser } from "@Hooks/useUser"
import { HttpAccount } from "@Services/API/Account"
import { useHistoryBack, usePrevPath } from "@Hooks/useHistoryBack"
import { setStoredSessionId, useAccessToken } from "@Hooks/useAccessToken"
// #endregion Local Imports

const Login = () => {
    const router = useRouter()
    const [keepLogin, setKeepLogin] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { updateUser } = useUser()
    const { refetchAccessToken } = useAccessToken()
    const { historyBack } = useHistoryBack("/community/questionList")
    const { prevPath } = usePrevPath()

    const handleSubmitLogin = async (e: FormEvent) => {
        e.preventDefault()
        const result = await HttpAccount.login({ email, password, keepLogin })
        if (result === null) {
            return false
        }
        if (result.sessionId !== null) {
            setStoredSessionId(result.sessionId)
        }
        updateUser({ ...result, keepLogin })
        refetchAccessToken()
        historyBack()
        return false
    }
    return (
        <>
            <AccountForm header="Login" onSubmit={handleSubmitLogin}>
                <Input
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
                    }}
                />
                <Input
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
                    }}
                />
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
                    <Space.Box />
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
