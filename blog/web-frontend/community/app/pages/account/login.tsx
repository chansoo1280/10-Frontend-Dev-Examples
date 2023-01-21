// #region Global Imports
import React, { useState } from "react"
import { useRouter } from "next/router"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Typography, Checkbox, Button, Icon, AccountForm } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { APILoginPOST, Http, ReqType } from "@Services"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { useUser } from "@Hooks/useUser"
// #endregion Local Imports

const { Text } = Typography
const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { updateUser } = useUser()

    const login = async () =>
        await Http<APILoginPOST>(ReqType.POST, "/api/account/login", undefined, {
            email: email,
            password: password,
        }).catch((e: ResMessageWithDesc) => {
            console.log(e)
            switch (e.status) {
                case ResStatus.NoContent:
                    console.log(e.description)
                    return null
                case ResStatus.BadRequest:
                    console.log(e.description)
                    return null

                default:
                    break
            }
            return null
        })

    const handleClickLogin = async () => {
        const user = await login()
        if (user === null) {
            return
        }
        updateUser(user)
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value)
                    }}
                />
                <AccountForm.Row>
                    <Space.Box>
                        <Checkbox
                            onChange={function (): void {
                                throw new Error("Function not implemented.")
                            }}
                            label="로그인 유지하기"
                        />
                    </Space.Box>
                    <Button href={"/account/find-pw"} size="small" type="link">
                        비밀번호를 잊으셨나요?
                    </Button>
                </AccountForm.Row>
                <AccountForm.Row>
                    <Space.Box>
                        <Button onClick={handleClickLogin} size="large">
                            로그인
                        </Button>
                    </Space.Box>
                    <Button onClick={() => router.back()} type="link">
                        이전으로
                    </Button>
                </AccountForm.Row>
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
