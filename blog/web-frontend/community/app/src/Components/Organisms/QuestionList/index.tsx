// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Space, Button, Text, Tags, IconList, QuestionAuthorInfo, Rows, Row } from "@Components"
import { Tag } from "@Components/Molecules/Tags"
import styles from "./QuestionList.module.scss"
import Link from "next/link"
import { Question } from "@Services/Question"
import { dateFormat } from "@Utils"
import { QuestionWithAuthor } from "@Services/Question/Question.entity"
// #endregion Local Imports

interface QuestionListProps extends defaultProps {
    questionList: QuestionWithAuthor[]
    onClickNext: React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLButtonElement>
    hideMore?: boolean
}

const QuestionList = (props: QuestionListProps): JSX.Element => {
    const { questionList, show, className, onClickNext, hideMore, ...rest } = props
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
            {questionList.map(({ id, title, author, created }) => (
                <Link key={id} href={"/community/questionList/" + id}>
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
                            <QuestionAuthorInfo userName={author.name} created={dateFormat(new Date(created), "yyyy-MM-dd hh:mm")} />
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
            <Space show={!hideMore} as="li" direction="vertical" padding="12px 0 0" className={classNames(styles[`${prefixCls}__more-item`])}>
                <Button onClick={onClickNext} type="secondary">
                    loading more
                </Button>
            </Space>
        </ul>
    )
}
export default QuestionList
