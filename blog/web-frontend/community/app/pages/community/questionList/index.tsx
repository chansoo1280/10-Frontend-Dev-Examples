// #region Global Imports
import Head from "next/head"
import { GetServerSideProps } from "next"
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/router"
import { dehydrate, QueryClient, useQuery } from "react-query"
// #endregion Global Imports

// #region Local Imports
import { Tabs, Space, Text, Button, Search, Tags, QuestionList, Card, LinedCard } from "@Components"
import { Tab } from "@Components/Molecules/Tabs"
import { Tag } from "@Components/Molecules/Tags"
import { useUser } from "@Hooks/useUser"
import { useScrollRestoration } from "@Hooks/index"
import { QuestionWithAuthor } from "@Services/Question/Question.entity"
import { HttpQuestionList } from "@Services/API/QuestionList"
import { usePrevPath } from "@Hooks/useHistoryBack"
// #endregion Local Imports

const QuestionListPage = (props: { layoutRef: React.RefObject<HTMLDivElement> }) => {
    const router = useRouter()
    const query = router.query
    const { user } = useUser()
    const { initScrollTop } = useScrollRestoration(props.layoutRef, router.pathname)
    const { prevPath } = usePrevPath()

    const { data } = useQuery("questionList", () => HttpQuestionList.getQuestionList(pageNo), {
        onSuccess: (received) => {
            if (!received) {
            } else {
                initScrollTop()
            }
        },
    })
    const [pageNo, setPageNo] = useState(Number(query.pageNo || "1"))
    const [totalPageCnt, setTotalPageCnt] = useState<number | null>(data?.totalPageCnt || null)
    const [questionList, setQuestionList] = useState<QuestionWithAuthor[]>(data?.questionList || [])

    const [activeIdx, setActiveIdx] = useState(0)
    const [tabList, _] = useState([{ title: "Question" }, { title: "Articles", disabled: true }])
    const onClickTab = (tab: Tab, idx: number) => {
        setActiveIdx(idx)
    }

    const isLastPage = totalPageCnt === null || totalPageCnt < pageNo || totalPageCnt === pageNo

    const handleClickNext = async () => {
        if (isLastPage) {
            console.log("마지막페이지입니다.")
            return
        }
        const nextPageNo = pageNo + 1
        const result = await HttpQuestionList.getQuestionListPaging(nextPageNo)
        if (result === null) {
            return
        }
        router.replace(
            {
                pathname: "/community/questionList",
                query: {
                    pageNo: nextPageNo,
                },
            },
            undefined,
            { shallow: true },
        )
        setTotalPageCnt(result.totalPageCnt)
        setQuestionList(questionList.concat(result.questionList))
        setPageNo(nextPageNo)
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
                <Space padding="13px 8px 0" bgType="white" direction="vertical">
                    <Space widthType="wide">
                        <Space.Box>
                            <Text>커뮤니티</Text>
                        </Space.Box>
                        <Button disabled={user === null} href={{ pathname: "/community/questionList/create", query: { prevPath } }}>
                            글작성
                        </Button>
                    </Space>
                    <Search
                        value={""}
                        placeholder="input search text"
                        onChange={function (e: ChangeEvent<HTMLInputElement>): void {
                            console.log(e)
                        }}
                        onSearch={function (value: string): void {
                            console.log(value)
                        }}
                    ></Search>
                    <Tabs activeIdx={activeIdx} onClick={onClickTab} tabList={tabList} />
                </Space>
                <Card.wrap>
                    <LinedCard>
                        <Space widthType="wide" padding="24px">
                            <Text>Category :</Text>
                            <Space.Box>
                                <Tags
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
                            </Space.Box>
                        </Space>
                        <QuestionList onClickNext={handleClickNext} hideMore={isLastPage} questionList={questionList} />
                    </LinedCard>
                </Card.wrap>
            </div>
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { pageNo } = query
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery("questionList", () => HttpQuestionList.getQuestionList(Number(pageNo || "1")))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default QuestionListPage
