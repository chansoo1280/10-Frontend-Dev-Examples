// #region Global Imports
import React, { useState } from "react"
import { useRouter } from "next/router"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Text, Checkbox, Button, Icon, AccountForm } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { HttpAccount } from "@Services"
import { useHistoryBack } from "@Hooks/useHistoryBack"
// #endregion Local Imports

const ResetPw = () => {
    const router = useRouter()
    const { historyBack } = useHistoryBack("/account/login")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const handleClickSave = async () => {
        if (password === "") {
            alert("비밀번호를 입력해주세요.")
            return
        }
        if (passwordConfirm === "") {
            alert("비밀번호 확인을 입력해주세요.")
            return
        }
        if (password !== passwordConfirm) {
            alert("확인 비밀번호가 일치하지 않습니다.")
            return
        }
        const result = await HttpAccount.resetPw({
            token: String(router.query.resetPwToken) || "",
            email: String(router.query.email) || "",
            password: password,
        })
        if (result !== null) {
            return
        }
        historyBack()
    }
    return (
        <>
            <AccountForm header="Reset Password">
                <Input
                    widthType="wide"
                    size="large"
                    prefix={<Icon iconName="xi-user-o" />}
                    placeholder="Password(6 digits at least, case sensitive)"
                    type="password"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                <Input
                    widthType="wide"
                    size="large"
                    prefix={<Icon iconName="xi-lock-o" />}
                    placeholder="Comfirm password"
                    type="password"
                    value={passwordConfirm}
                    onChange={(event) => {
                        setPasswordConfirm(event.target.value)
                    }}
                />
                <Button onClick={handleClickSave} widthType="wide" size="large">
                    저장
                </Button>
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
export default ResetPw
