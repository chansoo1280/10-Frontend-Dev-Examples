// #region Global Imports
import Head from "next/head"
import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
// #endregion Global Imports

// #region Local Imports
import { Input, Space, Button, Tags, Card, MDEditor, QuestionAuthorInfo, Breadcrumbs, Rows, Row } from "@Components"
import { Tag } from "@Components/Molecules/Tags"
import { useHistoryBack } from "@Hooks/useHistoryBack"
import { dehydrate, QueryClient, useQuery } from "react-query"
import { HttpQuestionList } from "@Services"
import { GetServerSideProps } from "next"
import { useUser } from "@Hooks/useUser"
// #endregion Local Imports

const QuestionCreate = () => {
    const router = useRouter()
    const { historyBack } = useHistoryBack("/community/questionList")
    const { user } = useUser()
    const { data } = useQuery(["question", router.query.questionId], () =>
        HttpQuestionList.getQuestion({
            id: Number(router.query.questionId),
        }),
    )
    const [title, setTitle] = useState(data?.title || "")
    const [contents, setContents] = useState(data?.contents || "")
    const handleClickSave = async () => {
        const result = await HttpQuestionList.moodifyQuestion({
            id: Number(router.query.questionId),
            title,
            contents,
        })
        if (result === null) {
            return
        }
        historyBack()
    }
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
                                title: "글수정",
                                href: "/community/questionList/1/modify",
                            },
                        ]}
                    ></Breadcrumbs>
                </Space>
                <Card.wrap padding={"24px"}>
                    <Card gap={"0"} padding={"0"} direction={"vertical"} bgType={"white"} separator={<div style={{ width: "100%", height: "1px", background: "#0000000F" }}></div>}>
                        <Rows gap="12px">
                            <Input
                                placeholder="제목을 입력해주세요."
                                widthType="wide"
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value)
                                }}
                            />
                            <Row>
                                <Tags
                                    onAdd={(text) => {
                                        console.log(text)
                                    }}
                                    boxProps={{ padding: "4px" }}
                                    tagList={[
                                        {
                                            title: "Javascript",
                                            type: "deletable",
                                        },
                                    ]}
                                    onClick={function (tag: Tag): void {
                                        throw new Error("Function not implemented.")
                                    }}
                                />
                            </Row>
                        </Rows>
                        <Rows padding="24px">
                            <MDEditor
                                value={contents}
                                onChange={(event) => {
                                    setContents(event.target.value)
                                }}
                            ></MDEditor>
                            <Row>
                                <QuestionAuthorInfo userName={user?.name || ""} created={data?.created} />
                            </Row>
                            <Row>
                                <Space.Box></Space.Box>
                                <Button onClick={handleClickSave}>저장</Button>
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { questionId } = query
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(["question", questionId], () =>
        HttpQuestionList.getQuestion({
            id: Number(questionId),
        }),
    )

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default QuestionCreate
