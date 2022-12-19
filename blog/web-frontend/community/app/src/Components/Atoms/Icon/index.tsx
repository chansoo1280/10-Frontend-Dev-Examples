// #region Global Imports
import React from "react"
import classNames from "classnames"
import localFont from "@next/font/local"
// #endregion Global Imports

// #region Local Imports
import { defaultProps } from "@Components"
import styles from "./Icon.module.scss"
import { IconNames } from "./IconNames"
const myFont = localFont({ src: "./xeicon.woff2" })
// #endregion Local Imports

interface IconProps extends defaultProps {
    iconName: IconNames
    irText?: string
}
const Icon = (props: IconProps): JSX.Element => {
    const { show, iconName, irText, ...rest } = props
    return (
        <i
            className={classNames(myFont.className, styles["xi-icon"], styles[`${iconName}`], {
                [styles[`xi-icon--hide`]]: show === false,
            })}
            {...rest}
        >
            {irText && <span className="ir">{irText}</span>}
        </i>
    )
}
export default Icon
