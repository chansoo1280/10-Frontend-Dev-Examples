// #region Global Imports
import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import classNames from "classnames"
import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from "next/dynamic"
// #endregion Global Imports

// #region Local Imports
import { defaultProps } from "@Components"
import styles from "./MDEditor.module.scss"
// #endregion Local Imports

const ReactMDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })
const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false })

interface MDEditorProps extends defaultProps {
    value: string
    onChange?: ChangeEventHandler<HTMLTextAreaElement>
    type?: "preview"
}

const MDEditor = (props: MDEditorProps): JSX.Element => {
    const { type, value, show, className, onChange, ...rest } = props
    const [innerValue, setValue] = useState(value)
    const prefixCls = "MD-editor"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    const handleChange = (markdownText?: string, e?: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(markdownText || "")
        if (e !== undefined && onChange) {
            onChange(e)
        }
    }
    const editorProps = {
        className: classes,
        height: 200,
        value: innerValue,
        onChange: handleChange,
        ...rest,
    }
    return type === "preview" ? <MarkdownPreview className={classes} style={{ minHeight: 100 }} source={innerValue} /> : <ReactMDEditor {...editorProps} />
}
export default MDEditor
