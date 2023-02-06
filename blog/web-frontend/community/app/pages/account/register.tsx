// #region Global Imports
import React, { createRef, useEffect, useState } from "react"
import { useQuery } from "react-query"
// #endregion Global Imports

// #region Local Imports
import { Input, Text, Space, Button, AccountForm, Row, FormInput } from "@Components"
import { Layout } from "@Components/Layouts"
import { PageProps } from "../_app"
import { useUser } from "@Hooks/useUser"
import { HttpUserList } from "@Services"
import { useHistoryBack } from "@Hooks/useHistoryBack"
import { resMessageWithDesc, ResMessageWithDesc, ResStatus } from "@Server/response"
import { verifyUser } from "@Services/User/User.entity"
// #endregion Local Imports

enum FormState {
    "NONE" = "NONE",
    "PENDING" = "PENDING",
    "EMPTY_NAME" = "EMPTY_NAME",
    "WRONG_NAME" = "WRONG_NAME",
    "EMPTY_EMAIL" = "EMPTY_EMAIL",
    "WRONG_EMAIL" = "WRONG_EMAIL",
    "EMPTY_VERIFYCODE" = "EMPTY_VERIFYCODE",
    "EXPIRED_VERIFYCODE" = "EXPIRED_VERIFYCODE",
    "WRONG_VERIFYCODE" = "WRONG_VERIFYCODE",
    "EXIT_USER" = "EXIT_USER",
    "EMPTY_PW" = "EMPTY_PW",
    "WRONG_PW" = "WRONG_PW",
    "EMPTY_PWCOMFIRM" = "EMPTY_PWCOMFIRM",
    "WRONG_PWCOMFIRM" = "WRONG_PWCOMFIRM",
    "FAIL" = "FAIL",
}
const FormMessage: { [key in FormState]: string } = {
    [FormState.NONE]: "",
    [FormState.PENDING]: "",
    [FormState.EMPTY_NAME]: "이름을 입력해주세요.",
    [FormState.WRONG_NAME]: "잘못된 이름 형식입니다.",
    [FormState.EMPTY_EMAIL]: "이메일을 입력해주세요.",
    [FormState.WRONG_EMAIL]: "잘못된 이메일 형식입니다.",
    [FormState.EXIT_USER]: "이미 존재하는 유저입니다.",
    [FormState.EMPTY_VERIFYCODE]: "인증번호를 입력해주세요.",
    [FormState.EXPIRED_VERIFYCODE]: "만료된 인증번호입니다.",
    [FormState.WRONG_VERIFYCODE]: "잘못된 인증번호입니다.",
    [FormState.EMPTY_PW]: "비밀번호를 입력해주세요.",
    [FormState.WRONG_PW]: "잘못된 비밀번호 형식입니다.",
    [FormState.EMPTY_PWCOMFIRM]: "비밀번호 확인값을 입력해주세요.",
    [FormState.WRONG_PWCOMFIRM]: "잘못된 비밀번호 확인값입니다.",
    [FormState.FAIL]: "",
}

const Login = () => {
    const { historyBack } = useHistoryBack("/community/questionList")

    const [formState, setFormState] = useState(FormState.NONE)
    const stateNotice = FormMessage[formState]
    const noticeRef = createRef<HTMLHeadingElement>()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [verifyCode, setVerifyCode] = useState("")
    const [verifyCodeToken, setVerifyCodeToken] = useState("")
    const { updateUser } = useUser()

    const register = async () =>
        await HttpUserList.register({ name, email, password, verifyCode, verifyCodeToken }).catch((e: ResMessageWithDesc) => {
            console.log(e)
            switch (e.status) {
                case ResStatus.BadRequest: {
                    if (e.description === "중복된 이메일") {
                        setFormState(FormState.EXIT_USER)
                    } else if (e.description === "만료된 인증번호입니다.") {
                        setFormState(FormState.EXPIRED_VERIFYCODE)
                    } else if (e.description === "인증번호가 올바르지 않습니다.") {
                        setFormState(FormState.WRONG_VERIFYCODE)
                    } else if (e.description === "만료된 인증번호입니다.") {
                        setFormState(FormState.EXPIRED_VERIFYCODE)
                    }
                    return null
                }

                default:
                    break
            }
            return null
        })

    const { isLoading, refetch } = useQuery("register", () => register(), {
        enabled: false,
    })

    const handleClickSendVerifyCode = async () => {
        if (email === "") {
            setFormState(FormState.EMPTY_EMAIL)
            return
        }
        const result = await HttpUserList.sendVerifyCodeEmail({ email }).catch((e: ResMessageWithDesc) => {
            console.log(e)
            switch (e.status) {
                case ResStatus.BadRequest: {
                    if (e.description === "중복된 이메일") {
                        setFormState(FormState.EXIT_USER)
                    }
                    return null
                }

                default:
                    break
            }
            return null
        })
        if (result === null) {
            return
        }
        setFormState(FormState.NONE)
        setVerifyCodeToken(result.token || "")
    }

    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (name === "") {
            setFormState(FormState.EMPTY_NAME)
            return
        }
        if (email === "") {
            setFormState(FormState.EMPTY_EMAIL)
            return
        }
        if (verifyCode === "") {
            setFormState(FormState.EMPTY_VERIFYCODE)
            return
        }
        if (verifyCodeToken === "") {
            setFormState(FormState.WRONG_VERIFYCODE)
            return
        }
        if (password === "") {
            setFormState(FormState.EMPTY_PW)
            return
        }
        if (passwordConfirm === "") {
            setFormState(FormState.EMPTY_PWCOMFIRM)
            return
        }

        const verifyResult = verifyUser(
            {
                email: email,
                name: name,
                password: password,
            },
            ["email", "name", "password"],
        )
        if (verifyResult !== true) {
            if (verifyResult === "name 형식이 올바르지 않습니다.") {
                setFormState(FormState.WRONG_NAME)
            } else if (verifyResult === "email 형식이 올바르지 않습니다.") {
                setFormState(FormState.WRONG_EMAIL)
            } else if (verifyResult === "password 형식이 올바르지 않습니다.") {
                setFormState(FormState.WRONG_PW)
            }
            return
        }

        if (password !== passwordConfirm) {
            setFormState(FormState.WRONG_PWCOMFIRM)
            return
        }

        const { data } = await refetch()
        if (data === null || data === undefined) {
            return
        }
        updateUser({ ...data, sessionId: null, keepLogin: true })
        historyBack()
    }

    useEffect(() => {
        if (formState !== FormState.NONE) {
            noticeRef.current?.focus()
        }
    }, [formState])
    useEffect(() => {
        if (isLoading === true) {
            setFormState(FormState.PENDING)
        }
    }, [isLoading])
    return (
        <>
            <AccountForm header="Register" onSubmit={handleSubmitRegister}>
                <Text show={!!stateNotice} ref={noticeRef} tabIndex={0} widthType="wide" size="small" status="error">
                    {stateNotice}
                </Text>
                <Row direction="vertical" align="flex-end">
                    <FormInput
                        minLength={7}
                        maxLength={14}
                        status={formState === FormState.EMPTY_NAME ? "error" : "normal"}
                        inputId="name"
                        label="name"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value)
                            if (formState === FormState.EMPTY_NAME) {
                                setFormState(FormState.NONE)
                            }
                        }}
                    />
                    <Text size="small">7~14 길이의 영문자, 숫자</Text>
                </Row>
                <FormInput
                    status={formState === FormState.EXIT_USER || formState === FormState.EMPTY_EMAIL ? "error" : "normal"}
                    inputId="email"
                    label="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value)
                        if (formState === FormState.EXIT_USER || formState === FormState.EMPTY_EMAIL) {
                            setFormState(FormState.NONE)
                        }
                    }}
                />
                <Row>
                    <Input
                        disabled={email === ""}
                        status={formState === FormState.EMPTY_VERIFYCODE || formState === FormState.EXPIRED_VERIFYCODE || formState === FormState.WRONG_VERIFYCODE ? "error" : "normal"}
                        inputId="verifyCode"
                        label="verifyCode"
                        size="large"
                        placeholder="Verification code"
                        value={verifyCode}
                        onChange={(event) => {
                            setVerifyCode(event.target.value)
                            if (formState === FormState.EMPTY_VERIFYCODE || formState === FormState.EXPIRED_VERIFYCODE || formState === FormState.WRONG_VERIFYCODE) {
                                setFormState(FormState.NONE)
                            }
                        }}
                    />
                    <Button disabled={email === ""} onClick={handleClickSendVerifyCode} size="large" type="secondary">
                        {verifyCodeToken === "" ? "인증번호 받기" : "재전송"}
                    </Button>
                </Row>

                <Row direction="vertical" align="flex-end">
                    <FormInput
                        minLength={8}
                        status={formState === FormState.EMPTY_PW ? "error" : "normal"}
                        inputId="password"
                        label="password"
                        placeholder="Password(6 digits at least, case sensitive)"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                            if (formState === FormState.EMPTY_PW) {
                                setFormState(FormState.NONE)
                            }
                        }}
                    />
                    <Text size="small">8~20 길이의 영문자, 숫자</Text>
                </Row>
                <FormInput
                    minLength={8}
                    maxLength={20}
                    status={formState === FormState.EMPTY_PWCOMFIRM ? "error" : "normal"}
                    inputId="passwordComfirm"
                    label="passwordComfirm"
                    placeholder="Comfirm password"
                    type="password"
                    value={passwordConfirm}
                    onChange={(event) => {
                        setPasswordConfirm(event.target.value)
                        if (formState === FormState.EMPTY_PWCOMFIRM) {
                            setFormState(FormState.NONE)
                        }
                    }}
                />
                <Row>
                    <Space.Box>
                        <Button loading={formState === FormState.PENDING} htmlType="submit" size="large">
                            회원가입
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
