// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Space, Button, Text, Tags, IconList, QuestionAuthorInfo, Rows, Row } from "@Components"
import { Tag } from "@Components/Molecules/Tags"
import styles from "./QuestionList.module.scss"
import Link from "next/link"
// #endregion Local Imports

export interface Question {
    questionId: string
    title: string
    href: string
    userId?: string
}
interface QuestionListProps extends defaultProps {
    questionList: Question[]
}

const QuestionList = (props: QuestionListProps): JSX.Element => {
    const { questionList, show, className, ...rest } = props
    const prefixCls = "question-list"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    return (
        <ul className={classes} {...rest}>
            {questionList.map(({ questionId, title, href }) => (
                <Link key={questionId} href={href}>
                    <Rows className={classNames(styles[`${prefixCls}__item`])} as="li">
                        <Space direction="vertical" align="flex-start" padding="0" gap="12px">
                            <Text className={classNames(styles[`${prefixCls}__title`])}>{title}</Text>
                            <Tags
                                boxProps={{
                                    padding: 0,
                                }}
                                tagList={[
                                    {
                                        title: "Javascript",
                                        type: "default",
                                    },
                                ]}
                                onClick={function (tag: Tag): void {
                                    throw new Error("Function not implemented.")
                                }}
                            />
                        </Space>
                        <Row>
                            <QuestionAuthorInfo userName="asd" created={"2021-02-05 13:51"} />
                        </Row>
                        <Row>
                            <IconList
                                iconList={[
                                    {
                                        iconName: "xi-star",
                                        value: "12",
                                    },
                                    {
                                        iconName: "xi-thumbs-up",
                                        value: "41",
                                    },
                                    {
                                        iconName: "xi-message",
                                        value: "13",
                                    },
                                ]}
                            />
                        </Row>
                    </Rows>
                </Link>
            ))}
            <Space as="li" direction="vertical" padding="12px 0 0" className={classNames(styles[`${prefixCls}__more-item`])}>
                <Button type="secondary">loading more</Button>
            </Space>
        </ul>
    )
}
export default QuestionList
