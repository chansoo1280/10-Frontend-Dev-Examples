// #region Global Imports
import React, { useState } from "react"
import { useRouter } from "next/router"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Button, AccountForm } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { APIUserListPOST, Http, ReqType } from "@Services"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { useUser } from "@Hooks/useUser"
// #endregion Local Imports

const Login = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const { updateUser } = useUser()

    const register = async () =>
        await Http<APIUserListPOST>(ReqType.POST, ["/api/userList"], undefined, {
            name: name,
            email: email,
            password: password,
        }).catch((e: ResMessageWithDesc) => {
            console.log(e)
            switch (e.status) {
                case ResStatus.BadRequest:
                    console.log(e.description)
                    return null

                default:
                    break
            }
            return null
        })

    const handleClickRegister = async () => {
        if (password !== passwordConfirm) {
            alert("확인 비밀번호가 일치하지 않습니다.")
            return
        }

        const user = await register()
        if (user === null) {
            return
        }
        updateUser(user)
        if (router.query.prevPath !== undefined) {
            router.back()
        } else {
            router.replace("/community/questions")
        }
    }
    return (
        <>
            <AccountForm header="Register">
                <Input
                    widthType="wide"
                    size="large"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                />
                <Input
                    widthType="wide"
                    size="large"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
                <Input
                    widthType="wide"
                    size="large"
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
                    placeholder="Comfirm password"
                    type="password"
                    value={passwordConfirm}
                    onChange={(event) => {
                        setPasswordConfirm(event.target.value)
                    }}
                />
                <AccountForm.Row>
                    <Input
                        size="large"
                        placeholder="Verification code"
                        value={verificationCode}
                        onChange={(event) => {
                            setVerificationCode(event.target.value)
                        }}
                    />
                    <Button size="large" type="secondary">
                        인증번호 받기
                    </Button>
                </AccountForm.Row>
                <AccountForm.Row>
                    <Space.Box>
                        <Button onClick={handleClickRegister} size="large">
                            회원가입
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
