// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps } from "@Components"
import styles from "./Text.module.scss"
// #endregion Local Imports

interface TextProps extends defaultProps {
    as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Text = ({ as = "span", ...rest }: TextProps) => {
    const TextNode = `${as}` as keyof JSX.IntrinsicElements
    return <TextNode className={classNames(styles[`text`])} {...rest} />
}
const Typography = {
    Text,
}
export default Typography
