// #region Global Imports
import React, { useState } from "react"
import { useRouter } from "next/router"

// #endregion Global Imports

// #region Local Imports
import { Input, Space, Text, Row, Button, Icon, AccountForm } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { HttpAccount } from "@Services"
import { useHistoryBack } from "@Hooks/useHistoryBack"

// #endregion Local Imports

const FindPw = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const { historyBack } = useHistoryBack("/account/login")
    const handleSendEmail = async () => {
        if (email === "") {
            alert("이메일을 입력해주세요.")
            return
        }
        const result = HttpAccount.sendEmailResetPwPath({ email })
        if (result === null) {
            return
        }
    }
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
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
                <Row>
                    <Space.Box>
                        <Button onClick={handleSendEmail} size="large">
                            전송
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
export default FindPw
