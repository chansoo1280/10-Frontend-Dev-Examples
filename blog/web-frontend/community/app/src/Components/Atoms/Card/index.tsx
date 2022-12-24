// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { Space, defaultProps } from "@Components"
import styles from "./Card.module.scss"
import { SpaceProps } from "../Space"
// #endregion Local Imports

const Card = (props: SpaceProps): JSX.Element => {
    const { show, className, children, ...rest } = props
    const prefixCls = "card"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    return (
        <Space className={classes} {...rest}>
            {children}
        </Space>
    )
}
interface CardWrapProps extends defaultProps {
    padding?: string | number
}
const Wrap = (props: CardWrapProps) => {
    const { padding, ...rest } = props
    return (
        <div
            className={classNames(styles[`card-wrap`])}
            style={{
                padding,
            }}
            {...rest}
        />
    )
}
Card.wrap = Wrap
export default Card
