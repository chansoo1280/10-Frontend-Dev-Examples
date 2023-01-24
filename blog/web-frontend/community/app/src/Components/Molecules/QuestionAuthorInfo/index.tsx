// #region Global Imports
import React from "react"
import classNames from "classnames"
import Image, { ImageLoader } from "next/image"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Button, Text } from "@Components"
import styles from "./QuestionAuthorInfo.module.scss"
import { dateFormat } from "@Utils"
// #endregion Local Imports
const myLoader: ImageLoader = ({ src, width, quality }) => {
    return `/public/Images/${src}?w=${width}&q=${quality || 75}`
}
interface QuestionAuthorInfoProps extends defaultProps {
    userName: string
    created?: string
}

const QuestionAuthorInfo = (props: QuestionAuthorInfoProps): JSX.Element => {
    const { userName, created, show, className, ...rest } = props
    const prefixCls = "question-author-info"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    return (
        <Text className={classes} size="small" {...rest}>
            <Button size="small" type="link">
                <Image loader={myLoader} src="me.png" alt="Picture of the user" width={24} height={24} />
                {userName}
            </Button>
            published at{" "}
            <Text type="link" size="small">
                https://ant.design
            </Text>
            <Text show={created !== undefined} size="small" className={classNames(styles[`${prefixCls}__date`])}>
                {/* 2021-02-05 13:51 */}
                {dateFormat(new Date(created || ""), "yyyy-MM-dd hh:mm")}
            </Text>
        </Text>
    )
}
export default QuestionAuthorInfo
