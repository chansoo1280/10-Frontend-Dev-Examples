// #region Global Imports
import React from "react"

// #endregion Global Imports

// #region Local Imports
import { Input, Space, Text, Row, Button, Icon, AccountForm } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { useRouter } from "next/router"

// #endregion Local Imports

const FindPw = () => {
    const router = useRouter()
    return (
        <>
            <AccountForm header="Find Password">
                <Row>
                    <Text>비밀번호 초기화 링크가 전송 됩니다.</Text>
                </Row>

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
                <Row>
                    <Space.Box>
                        <Button size="large">전송</Button>
                    </Space.Box>
                    <Button onClick={() => router.back()} type="link">
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
export default FindPw
