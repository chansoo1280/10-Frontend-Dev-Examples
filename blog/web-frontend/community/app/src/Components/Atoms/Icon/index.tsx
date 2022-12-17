// #region Global Imports
import React from "react"
import classNames from "classnames"
import localFont from "@next/font/local"
// #endregion Global Imports

// #region Local Imports
import styles from "./Icon.module.css"
const myFont = localFont({ src: "./xeicon.woff2" })
// #endregion Local Imports

interface IconProps {
    iconName: "loading"
}
const Icon = (props: IconProps): JSX.Element => {
    const { iconName } = props
    return <i className={classNames(myFont.className, styles[`icon--${iconName}`])}></i>
}
export default Icon
