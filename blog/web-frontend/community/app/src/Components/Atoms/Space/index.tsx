// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps } from "@Components"
import styles from "./Space.module.scss"
// #endregion Local Imports

export interface SpaceProps extends defaultProps {
    direction?: "horizontal" | "vertical"
    align?: "center" | "flex-start" | "flex-end"
    size?: "small" | "medium" | "large"
    gap?: string
    padding?: string | number
    onClick?: React.MouseEventHandler
    separator?: React.ReactNode
    bgType?: "white"
    as?: "div" | "li"
}
const Space = (props: SpaceProps): JSX.Element => {
    const { as = "div", separator, direction, align, size, show, className, gap, padding, children, bgType, ...rest } = props
    const prefixCls = "space"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
            [styles[`${prefixCls}--${size}`]]: size,
            [styles[`${prefixCls}--${direction}`]]: direction,
            [styles[`${prefixCls}--${align}`]]: align,
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
    const SpaceNode = `${as}` as keyof JSX.IntrinsicElements
    return (
        <SpaceNode {...rest} className={classes} style={{ gap, padding }}>
            {childrenNode}
        </SpaceNode>
    )
}
const Box = (props: defaultProps) => {
    const { ...rest } = props
    return <div className={classNames(styles[`space__box`])} {...rest} />
}
Space.Box = Box
export default Space
