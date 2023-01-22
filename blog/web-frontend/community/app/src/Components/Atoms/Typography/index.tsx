// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps } from "@Components"
import styles from "./Text.module.scss"
// #endregion Local Imports

interface TextProps extends defaultProps {
    as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    size?: "small" | "medium" | "large"
    type?: "defalut" | "link"
}

export const Text = ({ as = "span", size = "medium", className, show, type, ...rest }: TextProps) => {
    const TextNode = `${as}` as keyof JSX.IntrinsicElements
    const prefixCls = `text`
    return (
        <TextNode
            className={classNames(
                styles[prefixCls],
                {
                    [styles[`${prefixCls}--hide`]]: show === false,
                    [styles[`${prefixCls}--${size}`]]: size,
                    [styles[`${prefixCls}--${type}`]]: type,
                },
                className,
            )}
            {...rest}
        />
    )
}
