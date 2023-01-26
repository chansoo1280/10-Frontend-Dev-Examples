// #region Global Imports
import React, { useRef, useState } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, LinedCard } from "@Components"
import styles from "./Popover.module.scss"
import { useCallbackOutsideRef } from "@Hooks/useCallbackOutsideRef"
// #endregion Local Imports

interface PopoverProps extends defaultProps {
    contents: React.ReactNode
}

const Popover = (props: PopoverProps): JSX.Element => {
    const { contents, className, children, ...rest } = props
    const wrapperRef = useRef(null)
    useCallbackOutsideRef(wrapperRef, () => {
        if (isOpen === false) {
            return
        }
        setIsOpen(false)
    })
    const [isOpen, setIsOpen] = useState(false)
    const prefixCls = "popover"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--open`]]: isOpen,
        },
        className,
    )
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsOpen(true)
    }
    return (
        <div ref={wrapperRef} onClick={handleClick} className={styles[`${prefixCls}-wrap`]} {...rest}>
            {children}
            <LinedCard className={classes}>{contents}</LinedCard>
        </div>
    )
}
export default Popover
