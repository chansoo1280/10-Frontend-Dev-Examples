// #region Global Imports
import React from "react"
import Link from "next/link"
import classNames from "classnames"
import { UrlObject } from "url"
// #endregion Global Imports

// #region Local Imports
import styles from "./Button.module.scss"
import { defaultProps, Icon } from "@Components"
import { useClickAnimating, useLoading } from "@Hooks"
// #endregion Local Imports

type ButtonType = "primary" | "secondary" | "dashed" | "link" | "text"
type ButtonShape = "circle" | "round"
type ButtonHTMLType = "submit" | "button" | "reset"

interface BaseButtonProps extends defaultProps {
    icon?: React.ReactNode
    type?: ButtonType
    shape?: ButtonShape
    size?: "small" | "medium" | "large"
    danger?: boolean
    loading?: boolean
    desc?: string
}
type AnchorButtonProps = {
    href?: string | UrlObject
    target?: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
} & BaseButtonProps &
    Omit<React.AnchorHTMLAttributes<any>, "href" | "type" | "onClick">

type NativeButtonProps = {
    htmlType?: ButtonHTMLType
    onClick?: React.MouseEventHandler<HTMLButtonElement>
} & BaseButtonProps &
    Omit<React.ButtonHTMLAttributes<any>, "type" | "onClick">

type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>

const Button = (props: ButtonProps): JSX.Element => {
    const { href, icon, loading, show, htmlType = "button", size, type = "primary", shape, className, children, danger, desc, ...rest } = props
    const { innerLoading } = useLoading({ loading })
    const { isClick, execClickAnimation } = useClickAnimating()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
        const { onClick, disabled } = props
        execClickAnimation()
        if (innerLoading || disabled) {
            e.preventDefault()
            return
        }
        if (onClick === undefined) {
            return
        }
        ;(onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e)
    }
    const iconType = innerLoading ? "loading" : icon
    // const { name: theme } = useContext(ThemeContext)
    const prefixCls = "btn"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
            [styles[`${prefixCls}--${size}`]]: size,
            [styles[`${prefixCls}--${type}`]]: type,
            [styles[`${prefixCls}--${shape}`]]: shape,
            [styles[`${prefixCls}--icon-only`]]: !children && children !== 0 && !!iconType,
            [styles[`${prefixCls}--loading`]]: innerLoading,
            [styles[`${prefixCls}--danger`]]: danger,
        },
        className,
    )
    const iconNode = !innerLoading ? icon : <Icon iconName="xi-spinner-3" />
    return (
        <>
            {href !== undefined ? (
                <Link {...(rest as AnchorButtonProps)} onClick={handleClick} className={classes} href={href}>
                    {iconNode}
                    {children}
                </Link>
            ) : (
                <button {...(rest as NativeButtonProps)} onClick={handleClick} type={htmlType} className={classes} data-click-animating={isClick === true}>
                    {iconNode}
                    {children}
                </button>
            )}
            {desc && <span className={styles[`${prefixCls}__desc`]}>{desc}</span>}
        </>
    )
}
export default Button
