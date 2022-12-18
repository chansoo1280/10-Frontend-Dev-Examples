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
    gap?: number
    padding?: string | number
}
const Space = (props: SpaceProps): JSX.Element => {
    const { direction, size, show, className, gap, padding, ...rest } = props
    const prefixCls = "space"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
            [styles[`${prefixCls}--${size}`]]: size,
            [styles[`${prefixCls}--${direction}`]]: direction,
        },
        className,
    )
    return <div {...rest} className={classes} style={{ gap, padding }} />
}
const Box = (props: defaultProps) => {
    const { ...rest } = props
    return <div className={classNames(styles[`space__box`])} {...rest} />
}
Space.Box = Box
export default Space
