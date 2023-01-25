// #region Global Imports
import React, { useState } from "react"
import { useRouter } from "next/router"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Checkbox, Button, Icon, AccountForm, Row } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { useUser } from "@Hooks/useUser"
import { HttpAccount } from "@Services/API/Account"
import { useHistoryBack, usePrevPath } from "@Hooks/useHistoryBack"
// #endregion Local Imports

const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { updateUser } = useUser()
    const { historyBack } = useHistoryBack("/community/questionList")
    const { prevPath } = usePrevPath()

    const handleClickLogin = async () => {
        const user = await HttpAccount.login({ email, password })
        if (user === null) {
            return
        }
        updateUser(user)
        historyBack()
    }
    return (
        <>
            <AccountForm header="Login">
                <Input
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
                            onChange={function (): void {
                                throw new Error("Function not implemented.")
                            }}
                            label="로그인 유지하기"
                        />
                    </Space.Box>
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
                        <Button onClick={handleClickLogin} size="large">
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
