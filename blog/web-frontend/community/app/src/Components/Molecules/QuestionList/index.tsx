// #region Global Imports
import React from "react"
import classNames from "classnames"
import Image, { ImageLoader } from "next/image"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Space, Button, Typography, Tags, Icon } from "@Components"
import { Tab } from "@Components/Molecules/Tabs"
import { Tag } from "@Components/Molecules/Tags"
import styles from "./QuestionList.module.scss"
import Link from "next/link"
// #endregion Local Imports

const { Text } = Typography
const myLoader: ImageLoader = ({ src, width, quality }) => {
    return `/public/Images/${src}?w=${width}&q=${quality || 75}`
}

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
                    <Space className={classNames(styles[`${prefixCls}__item`])} as="li" direction="vertical" align="flex-start" padding="16px 24px" gap="16px">
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
                        <Text size="small">
                            <Button size="small" type="link">
                                <Image loader={myLoader} src="me.png" alt="Picture of the user" width={24} height={24} />
                                username
                            </Button>
                            published at{" "}
                            <Text type="link" size="small">
                                https://ant.design
                            </Text>
                            <Text size="small" className={classNames(styles[`${prefixCls}__date`])}>
                                2021-02-05 13:51
                            </Text>
                        </Text>
                        <Space padding="5px 0" gap="16px" separator={<div style={{ width: "1px", height: "16px", background: "#0000000F" }}></div>}>
                            <Text className={classNames(styles[`${prefixCls}__count`])}>
                                <Icon iconName="xi-star" /> 12
                            </Text>
                            <Text className={classNames(styles[`${prefixCls}__count`])}>
                                <Icon iconName="xi-thumbs-up" /> 41
                            </Text>
                            <Text className={classNames(styles[`${prefixCls}__count`])}>
                                <Icon iconName="xi-message" /> 13
                            </Text>
                        </Space>
                    </Space>
                </Link>
            ))}
            <Space as="li" direction="vertical" padding="12px 0 0" className={classNames(styles[`${prefixCls}__more-item`])}>
                <Button type="secondary">loading more</Button>
            </Space>
        </ul>
    )
}
export default QuestionList
