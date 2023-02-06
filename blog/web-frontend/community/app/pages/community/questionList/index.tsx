// #region Global Imports
import Head from "next/head"
import { GetServerSideProps } from "next"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { dehydrate, QueryClient, useQuery } from "react-query"
// #endregion Global Imports

// #region Local Imports
import { Tabs, Space, Text, Button, Search, Tags, QuestionList, Card, LinedCard } from "@Components"
import { Tab } from "@Components/Molecules/Tabs"
import { CheckableTag, Tag } from "@Components/Molecules/Tags"
import { useUser } from "@Hooks/useUser"
import { QuestionWithAuthor } from "@Services/Question/Question.entity"
import { HttpQuestionList } from "@Services/API/QuestionList"
import { usePrevPath } from "@Hooks/useHistoryBack"
import useScrollRestoration from "@Hooks/useScrollRestoration"
// #endregion Local Imports

const QuestionListPage = (props: { layoutRef: React.RefObject<HTMLDivElement> }) => {
    const router = useRouter()
    const query = router.query
    const { user } = useUser()
    const { initScrollTop } = useScrollRestoration(props.layoutRef, router.pathname)
    const { prevPath } = usePrevPath()
    const [checkedTagsStr, setCheckedTagsStr] = useState(String(query.checkedTagsStr || ""))
    const [searchText, setSearchText] = useState(String(query.searchStr || ""))
    const [searchStr, setSearchStr] = useState(String(query.searchStr || ""))
    const { data, refetch } = useQuery("questionList", () => HttpQuestionList.getQuestionList(pageNo, checkedTagsStr, searchStr), {
        staleTime: 60 * 60 * 1000,
        onSuccess: (received) => {
            console.log(received)
            if (!received) {
            } else {
                const booleanSort = (a: string, b: string) => {
                    const aChecked = received.tagList?.includes(a) ? true : false
                    const bChecked = received.tagList?.includes(b) ? true : false
                    return aChecked === bChecked ? 0 : aChecked ? -1 : 1
                }
                initScrollTop()
                setTotalPageCnt(received?.totalPageCnt || null)
                setQuestionList(received?.questionList || [])
                setPageNo(pageNo >= (received?.totalPageCnt || 1) ? received?.totalPageCnt || 1 : pageNo)
                setTagList(
                    (received?.ableTagList || []).sort(booleanSort).map((title) => ({
                        title,
                        type: "checkable",
                        checked: !!tagList.find((tag) => tag.checked === true && tag.title === title),
                    })),
                )
            }
        },
    })
    const [pageNo, setPageNo] = useState(Number(query.pageNo || "1"))
    const [totalPageCnt, setTotalPageCnt] = useState<number | null>(data?.totalPageCnt || null)
    const [questionList, setQuestionList] = useState<QuestionWithAuthor[]>(data?.questionList || [])
    const [tagList, setTagList] = useState<CheckableTag[]>(
        (data?.ableTagList || []).map((title) => ({
            title,
            type: "checkable",
            checked: !!data?.tagList?.includes(title),
        })),
    )

    // const [activeIdx, setActiveIdx] = useState(0)
    const tabList = [{ title: "Question" }, { title: "Articles", disabled: true }]
    // const onClickTab = (tab: Tab, idx: number) => {
    //     setActiveIdx(idx)
    // }

    const isLastPage = totalPageCnt === null || totalPageCnt < pageNo || totalPageCnt === pageNo

    const handleClickNext = async () => {
        if (isLastPage) {
            console.log("마지막페이지입니다.")
            return
        }
        const nextPageNo = pageNo + 1
        const result = await HttpQuestionList.getQuestionListPaging(nextPageNo, checkedTagsStr, searchStr)
        if (result === null) {
            return
        }

        setTotalPageCnt(result.totalPageCnt)
        setQuestionList(questionList.concat(result.questionList))
        setPageNo(nextPageNo)
    }

    const handleClickTag = (tag: Tag) => {
        setTagList(
            tagList.map((tagObj) => ({
                ...tagObj,
                checked: tagObj.title === tag.title ? !tagObj.checked : tagObj.checked,
            })),
        )
        setPageNo(1)
    }
    const handleSearch = (value: string) => {
        if (value === searchStr) {
            refetch()
            return
        }
        setSearchStr(value)
    }

    useEffect(() => {
        setCheckedTagsStr(
            tagList
                .sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
                .sort((a, b) => (a.checked === b.checked ? 0 : a.checked ? -1 : 1))
                .filter((tagObj) => tagObj.checked)
                .map((tagObj) => tagObj.title)
                .join(", "),
        )
    }, [tagList])

    useEffect(() => {
        router.replace(
            {
                pathname: "/community/questionList",
                query: {
                    pageNo: pageNo,
                    checkedTagsStr: checkedTagsStr,
                    searchStr: searchStr,
                },
            },
            undefined,
            { shallow: true },
        )
    }, [pageNo, checkedTagsStr, searchStr])

    useEffect(() => {
        refetch()
    }, [checkedTagsStr, searchStr, refetch])

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
                    <Search value={searchText} placeholder="input search text" onChange={(e) => setSearchText(e.target.value)} onSearch={handleSearch} />
                    <Tabs activeIdx={0} tabList={tabList} />
                </Space>
                <Card.wrap>
                    <LinedCard>
                        <Space widthType="wide" padding="24px">
                            <Text>Category :</Text>
                            <Space.Box>
                                <Tags boxProps={{ padding: "4px" }} tagList={tagList} onClick={handleClickTag} />
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
    const { pageNo, checkedTagsStr, searchStr } = query
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery("questionList", () => HttpQuestionList.getQuestionList(Number(pageNo || "1"), String(checkedTagsStr || ""), String(searchStr || "")))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}
export default QuestionListPage
