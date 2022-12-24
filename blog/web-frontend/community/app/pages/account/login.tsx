// #region Global Imports
import React from "react"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Typography, Checkbox, Button, Icon, AccountForm } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
// #endregion Local Imports

const { Text } = Typography
const Login = () => {
    return (
        <>
            <AccountForm header="Login">
                <Input
                    widthType="wide"
                    size="large"
                    prefix={<Icon iconName="xi-user-o" />}
                    placeholder="Email"
                    value={""}
                    onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                        throw new Error("Function not implemented.")
                    }}
                />
                <Input
                    widthType="wide"
                    size="large"
                    prefix={<Icon iconName="xi-lock-o" />}
                    placeholder="Password"
                    type="password"
                    value={""}
                    onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                        throw new Error("Function not implemented.")
                    }}
                />
                <Space padding="0" widthType="wide">
                    <Space.Box>
                        <Checkbox
                            onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error("Function not implemented.")
                            }}
                            label="로그인 유지하기"
                        />
                    </Space.Box>
                    <Button size="small" type="link">
                        비밀번호를 잊으셨나요?
                    </Button>
                </Space>
                <Space padding="0" widthType="wide">
                    <Space.Box>
                        <Button size="large">로그인</Button>
                    </Space.Box>
                    <Button href="/" type="link">
                        이전으로
                    </Button>
                </Space>
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
