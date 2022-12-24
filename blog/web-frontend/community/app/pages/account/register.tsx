// #region Global Imports
import React from "react"
import { useRouter } from "next/router"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Typography, Checkbox, Button, Icon, AccountForm } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
// #endregion Local Imports

const { Text } = Typography
const Login = () => {
    const router = useRouter()
    return (
        <>
            <AccountForm header="Register">
                <Input
                    widthType="wide"
                    size="large"
                    placeholder="Email"
                    value={""}
                    onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                        throw new Error("Function not implemented.")
                    }}
                />
                <Input
                    widthType="wide"
                    size="large"
                    placeholder="Password(6 digits at least, case sensitive)"
                    type="password"
                    value={""}
                    onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                        throw new Error("Function not implemented.")
                    }}
                />
                <Input
                    widthType="wide"
                    size="large"
                    placeholder="Comfirm password"
                    type="password"
                    value={""}
                    onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                        throw new Error("Function not implemented.")
                    }}
                />
                <AccountForm.Row>
                    <Input
                        size="large"
                        placeholder="Verification code"
                        value={""}
                        onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                            throw new Error("Function not implemented.")
                        }}
                    />
                    <Button size="large" type="secondary">
                        인증번호 받기
                    </Button>
                </AccountForm.Row>
                <AccountForm.Row>
                    <Space.Box>
                        <Button size="large">회원가입</Button>
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
