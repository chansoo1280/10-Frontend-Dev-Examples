// #region Global Imports
import React, { ChangeEvent, ChangeEventHandler, ReactNode, useRef, useState } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps } from "@Components"
import { useClickAnimating } from "@Hooks"
import styles from "./Input.module.scss"
// #endregion Local Imports

interface BaseInputProps extends defaultProps {
    type?: "text" | "email" | "password"
    size?: "small" | "medium" | "large"
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
    prefix?: ReactNode
    suffix?: ReactNode
}

type InputProps = BaseInputProps & Omit<React.InputHTMLAttributes<any>, "value" | "type" | "onChange" | "size" | "prefix" | "suffix">
const Input = (props: InputProps): JSX.Element => {
    const { value, show, size, className, onChange, disabled, prefix, suffix, placeholder, ...rest } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [innerValue, setValue] = useState(value)
    const { isClick, execClickAnimation } = useClickAnimating()
    const prefixCls = "input"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
            [styles[`${prefixCls}--${size}`]]: size,
        },
        className,
    )
    const inputClasses = classNames(styles[`${prefixCls}__input`])
    const handleClick = () => {
        execClickAnimation()
    }
    const handleClickBox = () => {
        execClickAnimation()
        inputRef?.current?.focus()
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!onChange || disabled) {
            setValue("")
            return
        }
        onChange(e)
        setValue(e.currentTarget.value)
    }
    return (
        <div className={classes} data-click-animating={isClick === true} {...rest} onClick={handleClickBox}>
            {prefix}
            <input ref={inputRef} className={inputClasses} onChange={handleChange} disabled={disabled} value={innerValue} onClick={handleClick} placeholder={placeholder} />
            {suffix}
        </div>
    )
}
export default Input
