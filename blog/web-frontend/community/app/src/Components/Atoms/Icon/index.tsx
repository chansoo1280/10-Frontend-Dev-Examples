// #region Global Imports
import React from "react"
import classNames from "classnames"
import localFont from "@next/font/local"
// #endregion Global Imports

// #region Local Imports
import styles from "./Icon.module.scss"
import { IconNames } from "./IconNames"
const myFont = localFont({ src: "./xeicon.woff2" })
// #endregion Local Imports

interface IconProps {
    iconName: IconNames
}
const Icon = (props: IconProps): JSX.Element => {
    const { iconName } = props
    return <i className={classNames(myFont.className, styles["xi-icon"], styles[`${iconName}`])}></i>
}
export default Icon
