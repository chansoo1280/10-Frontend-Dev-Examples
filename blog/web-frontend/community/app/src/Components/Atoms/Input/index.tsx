// #region Global Imports
import React, { ChangeEvent, ChangeEventHandler, ReactNode, useRef, useState, FocusEvent, FocusEventHandler, RefObject, forwardRef, KeyboardEventHandler, KeyboardEvent } from "react"
import classNames from "classnames"
import composeRefs from "@seznam/compose-react-refs"

// #endregion Global Imports

// #region Local Imports
import { defaultProps } from "@Components"
import { useClickAnimating } from "@Hooks"
import styles from "./Input.module.scss"
// #endregion Local Imports

interface InputProps extends defaultProps {
    type?: "text" | "email" | "password"
    size?: "small" | "medium" | "large"
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
    onBlur?: FocusEventHandler<HTMLInputElement>
    onEnter?: KeyboardEventHandler<HTMLInputElement>
    prefix?: ReactNode
    suffix?: ReactNode
    placeholder?: string
}

const Input = (props: InputProps, ref?: React.Ref<HTMLInputElement>) => {
    const { value, show, size, className, onChange, onBlur, onEnter, disabled, prefix, suffix, placeholder, ...rest } = props
    const inputRef = useRef<HTMLInputElement>(null)
    const [innerValue, setValue] = useState(value)
    const [focused, setFocused] = useState(false)
    const { isClick, execClickAnimation } = useClickAnimating()
    const prefixCls = "input"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
            [styles[`${prefixCls}--${size}`]]: size,
            [styles[`${prefixCls}--disabled`]]: disabled,
            [styles[`${prefixCls}--focus`]]: focused,
            [styles[`${prefixCls}--have-prefix`]]: prefix,
            [styles[`${prefixCls}--have-suffix`]]: suffix,
        },
        className,
    )
    const handleClick = () => {
        execClickAnimation()
        setFocused(true)
    }
    const handleBlur = () => {
        setFocused(false)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key)
        if (e.key === "Enter" && onEnter) {
            onEnter(e)
        }
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
    const boxProps = {
        className: classes,
        "data-click-animating": isClick === true,
        onClick: handleClickBox,
        onBlur: handleBlur,
        ...rest,
    }
    const inputProps = {
        ref: composeRefs(ref, inputRef),
        className: classNames(styles[`${prefixCls}__input`]),
        onChange: handleChange,
        disabled: disabled,
        value: innerValue,
        onClick: handleClick,
        placeholder: placeholder,
        onBlur,
        onKeyDown: handleKeyDown,
    }
    return (
        <div {...boxProps}>
            {prefix}
            <input {...inputProps} />
            {suffix}
        </div>
    )
}
export default forwardRef(Input)
