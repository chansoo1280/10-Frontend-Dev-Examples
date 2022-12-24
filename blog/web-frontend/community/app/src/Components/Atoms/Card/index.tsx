// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { Space, defaultProps } from "@Components"
import styles from "./Card.module.scss"
import { SpaceProps } from "../Space"
// #endregion Local Imports

export interface CardProps extends defaultProps {
    padding?: string | number
    onClick?: React.MouseEventHandler
    BoxProps?: SpaceProps
}
const Card = (props: CardProps): JSX.Element => {
    const { show, className, padding, children, BoxProps, ...rest } = props
    const prefixCls = "card"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    return (
        <Space className={classes} style={{ padding }} {...BoxProps} {...rest}>
            {children}
        </Space>
    )
}
const Wrap = (props: defaultProps) => {
    const { ...rest } = props
    return <div className={classNames(styles[`card-wrap`])} {...rest} />
}
Card.wrap = Wrap
export default Card
