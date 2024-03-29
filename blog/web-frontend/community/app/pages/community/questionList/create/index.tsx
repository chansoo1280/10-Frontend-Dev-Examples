// #region Global Imports
import Head from "next/head"
import { createRef, useEffect, useState } from "react"
import { useQuery } from "react-query"
// #endregion Global Imports

// #region Local Imports
import { Input, Text, Space, Button, Tags, Card, MDEditor, QuestionAuthorInfo, Breadcrumbs, Rows, Row } from "@Components"
import { Tag } from "@Components/Molecules/Tags"
import { useUser } from "@Hooks/useUser"
import { HttpQuestionList } from "@Services"
import { useHistoryBack } from "@Hooks/useHistoryBack"
// #endregion Local Imports

enum FormState {
    "NONE" = "NONE",
    "PENDING" = "PENDING",
    "EMPTY_TITLE" = "EMPTY_TITLE",
    "EMPTY_CONTENTS" = "EMPTY_CONTENTS",
    "FAIL" = "FAIL",
}
const FormMessage: { [key in FormState]: string } = {
    [FormState.NONE]: "",
    [FormState.PENDING]: "",
    [FormState.EMPTY_TITLE]: "제목을 입력해주세요.",
    [FormState.EMPTY_CONTENTS]: "내용을 입력해주세요.",
    [FormState.FAIL]: "",
}

const QuestionCreate = () => {
    const { historyBack } = useHistoryBack("/community/questionList")

    const [formState, setFormState] = useState(FormState.NONE)
    const stateNotice = FormMessage[formState]
    const noticeRef = createRef<HTMLHeadingElement>()

    const { user } = useUser()
    const [title, setTitle] = useState("")
    const [contents, setContents] = useState("")
    const [tagList, setTagList] = useState<Tag[]>([
        {
            title: "Javascript",
            type: "deletable",
        },
    ])
    const tags = tagList.map((tag) => tag.title)

    const createQuestion = async () => {
        if (user === null) {
            return
        }
        return await HttpQuestionList.createQuestion(
            {
                title,
                contents,
                tags,
            },
            { id: user.id },
        )
    }
    const { isLoading, refetch } = useQuery("createQuestion", () => createQuestion(), {
        enabled: false,
    })

    const handleSubmitSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (title === "") {
            setFormState(FormState.EMPTY_TITLE)
            return
        }
        if (contents === "") {
            setFormState(FormState.EMPTY_CONTENTS)
            return
        }
        const { data } = await refetch()
        if (data === null || data === undefined) {
            return
        }
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
            <Head>
                <title>Dev Community</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Space padding="16px 24px" bgType="white">
                    <Breadcrumbs
                        BoxProps={{
                            padding: "0",
                        }}
                        breadcrumbList={[
                            {
                                title: "커뮤니티",
                                href: "/community/questionList",
                            },
                            {
                                title: "글작성",
                                href: "/community/questionList/create",
                            },
                        ]}
                    ></Breadcrumbs>
                </Space>
                <Card.wrap padding={"24px"}>
                    <Card
                        as="form"
                        onSubmit={handleSubmitSave}
                        gap={"0"}
                        padding={"0"}
                        direction={"vertical"}
                        bgType={"white"}
                        separator={<div style={{ width: "100%", height: "1px", background: "#0000000F" }}></div>}
                    >
                        <Text className="ir" show={!!stateNotice} ref={noticeRef} tabIndex={0} widthType="wide" size="small" status="error">
                            {stateNotice}
                        </Text>
                        <Rows gap="12px">
                            <Input
                                status={formState === FormState.EMPTY_TITLE ? "error" : "normal"}
                                placeholder="제목을 입력해주세요."
                                widthType="wide"
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value)
                                    if (formState === FormState.EMPTY_TITLE) {
                                        setFormState(FormState.NONE)
                                    }
                                }}
                            />
                            <Row>
                                <Tags
                                    onAdd={(text) => {
                                        if (tags.includes(text) === true) {
                                            return
                                        }
                                        setTagList(
                                            tagList.concat({
                                                title: text,
                                                type: "deletable",
                                            }),
                                        )
                                    }}
                                    boxProps={{ padding: "4px" }}
                                    tagList={tagList}
                                    onClick={(tag: Tag) => {
                                        setTagList(tagList.filter((tagObj) => tagObj !== tag))
                                    }}
                                />
                            </Row>
                        </Rows>
                        <Rows padding="24px">
                            <MDEditor
                                status={formState === FormState.EMPTY_CONTENTS ? "error" : "normal"}
                                value={contents}
                                onChange={(event) => {
                                    setContents(event.target.value)
                                    if (formState === FormState.EMPTY_CONTENTS) {
                                        setFormState(FormState.NONE)
                                    }
                                }}
                            />
                            <Row>
                                <QuestionAuthorInfo userName={user?.name || ""} />
                            </Row>
                            <Row>
                                <Space.Box></Space.Box>
                                <Button loading={formState === FormState.PENDING} htmlType="submit">
                                    저장
                                </Button>
                                <Button onClick={historyBack} type="secondary">
                                    취소
                                </Button>
                            </Row>
                        </Rows>
                    </Card>
                </Card.wrap>
            </div>
        </>
    )
}

export default QuestionCreate
