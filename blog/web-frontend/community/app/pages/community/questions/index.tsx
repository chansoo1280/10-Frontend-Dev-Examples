// #region Global Imports
import Head from "next/head"
import { ChangeEvent, useState } from "react"
// #endregion Global Imports

// #region Local Imports
import { Tabs, Space, Typography, Button, Search, Tags, QuestionList, Card } from "@Components"
import { Tab } from "@Components/Molecules/Tabs"
import { Tag } from "@Components/Molecules/Tags"
// #endregion Local Imports

const { Text } = Typography
const Question = () => {
    const [activeIdx, setActiveIdx] = useState(0)
    const [tabList, _] = useState([{ title: "Question" }, { title: "Articles", disabled: true }])
    const onClickTab = (tab: Tab, idx: number) => {
        setActiveIdx(idx)
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
                        <Button href={"/community/questions/create"}>글작성</Button>
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
                    <Card gap={"0"} padding={"0"} direction={"vertical"} bgType={"white"} separator={<div style={{ width: "100%", height: "1px", background: "#0000000F" }}></div>}>
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
                        <QuestionList
                            questionList={[
                                {
                                    questionId: "1",
                                    title: "title",
                                    href: "/community/questions/1",
                                    userId: "1",
                                },
                                {
                                    questionId: "2",
                                    title: "title",
                                    href: "#a",
                                    userId: "2",
                                },
                                {
                                    questionId: "3",
                                    title: "title",
                                    href: "#a",
                                    userId: "3",
                                },
                                {
                                    questionId: "4",
                                    title: "title",
                                    href: "#a",
                                    userId: "4",
                                },
                                {
                                    questionId: "5",
                                    title: "title",
                                    href: "#a",
                                    userId: "5",
                                },
                            ]}
                        />
                    </Card>
                </Card.wrap>
            </div>
        </>
    )
}

export default Question