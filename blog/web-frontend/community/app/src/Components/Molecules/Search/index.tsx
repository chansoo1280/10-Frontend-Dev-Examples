// #region Global Imports
import React, { useState } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Space, Input, Button } from "@Components"
import styles from "./Search.module.scss"
import useClickAnimating from "@Hooks/useClickAnimating"
// #endregion Local Imports

interface SearchProps extends defaultProps {
    size?: "small" | "medium" | "large"
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onSearch: (value: string) => void
    placeholder?: string
    "data-click-animating"?: boolean
}

const Search = (props: SearchProps): JSX.Element => {
    const { size, value, show, className, onChange, onSearch, disabled, placeholder, ...rest } = props
    const [innerValue, setValue] = useState(value)
    const { isClick, execClickAnimation } = useClickAnimating()
    const prefixCls = "search"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    const handleClick = () => {
        execClickAnimation()
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e)
        setValue(e.currentTarget.value)
    }
    return (
        <Space onClick={handleClick} gap="0" padding={0} className={classes} {...rest} data-click-animating={isClick === true}>
            <Input size={size} placeholder={placeholder} disabled={disabled} value={innerValue} onChange={handleChange} className={classNames(styles[`${prefixCls}__input`])} />
            <Button size={size} disabled={disabled} onClick={() => onSearch(innerValue)} className={classNames(styles[`${prefixCls}__btn`])}>
                Search
            </Button>
        </Space>
    )
}
export default Search
