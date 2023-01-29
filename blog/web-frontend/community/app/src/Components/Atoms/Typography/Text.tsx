// #region Global Imports
import React, { forwardRef } from "react"
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
    status?: "normal" | "error" | "warning"
    widthType?: "wide"
}

const Text = ({ as = "span", size = "medium", className, show, type, status, widthType, ...rest }: TextProps, ref?: React.Ref<HTMLHeadingElement>) => {
    const TextNode: keyof JSX.IntrinsicElements = `${as}`
    const prefixCls = `text`
    return (
        <TextNode
            ref={ref}
            className={classNames(
                styles[prefixCls],
                {
                    [styles[`${prefixCls}--hide`]]: show === false,
                    [styles[`${prefixCls}--${size}`]]: size,
                    [styles[`${prefixCls}--${type}`]]: type,
                    [styles[`${prefixCls}--${status}`]]: status,
                    [styles[`${prefixCls}--${widthType}`]]: widthType,
                },
                className,
            )}
            {...rest}
        />
    )
}
export default forwardRef(Text)
