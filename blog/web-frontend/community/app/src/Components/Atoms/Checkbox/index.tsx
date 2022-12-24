// #region Global Imports
import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps } from "@Components"
import Typography from "../Typography"
import { useClickAnimating } from "@Hooks"
import styles from "./Checkbox.module.scss"
// #endregion Local Imports
const { Text } = Typography
interface CheckboxProps extends defaultProps {
    checked?: boolean
    onChange: ChangeEventHandler<HTMLInputElement>
    label?: string
}

const Checkbox = (props: CheckboxProps): JSX.Element => {
    const { checked = false, id, show, className, onChange, disabled, label, ...rest } = props
    const checkboxRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState(checked)
    const { isClick, execClickAnimation } = useClickAnimating()
    const prefixCls = "checkbox"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (disabled) {
            return
        }
        if (e.currentTarget.checked === true) {
            execClickAnimation()
        }
        setValue(!value)
        onChange(e)
    }
    const boxProps = {
        className: classes,
        ...rest,
    }
    const checkboxProps = {
        ref: checkboxRef,
        id,
        className: classNames(styles[`${prefixCls}__checkbox`]),
        onChange: handleChange,
        disabled,
        checked: value,
        "data-click-animating": isClick === true,
    }
    return (
        <div {...boxProps}>
            <input type="checkbox" {...checkboxProps} />
            {label && (
                <label htmlFor={id}>
                    <Text size="small">{label}</Text>
                </label>
            )}
        </div>
    )
}
export default Checkbox
