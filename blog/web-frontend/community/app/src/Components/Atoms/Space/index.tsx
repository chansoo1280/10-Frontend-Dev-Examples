// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps } from "@Components"
import styles from "./Space.module.scss"
// #endregion Local Imports

interface SpaceProps extends defaultProps {
    direction?: "vertical"
    size?: "small" | "medium" | "large"
    gap?: string
    padding?: string | number
    onClick?: React.MouseEventHandler
    separator?: React.ReactNode
    fillWidth?: boolean
    bgType?: "white"
}
const Space = (props: SpaceProps): JSX.Element => {
    const { separator, direction, size, show, className, gap, padding, children, fillWidth, bgType, ...rest } = props
    const prefixCls = "space"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
            [styles[`${prefixCls}--${size}`]]: size,
            [styles[`${prefixCls}--${direction}`]]: direction,
            [styles[`${prefixCls}--fill-width`]]: fillWidth,
            [styles[`${prefixCls}--${bgType}`]]: bgType,
        },
        className,
    )
    const childrenLen = (Array.isArray(children) && children.length) || 1
    const childrenNode = React.Children.map(children, (childItem, idx) => {
        return (
            <>
                {childItem}
                {idx !== childrenLen - 1 && separator}
            </>
        )
    })
    return (
        <div {...rest} className={classes} style={{ gap, padding }}>
            {childrenNode}
        </div>
    )
}
const Box = (props: defaultProps) => {
    const { ...rest } = props
    return <div className={classNames(styles[`space__box`])} {...rest} />
}
Space.Box = Box
export default Space
