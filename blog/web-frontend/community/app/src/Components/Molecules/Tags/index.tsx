// #region Global Imports
import React, { useEffect, useRef, useState } from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Space, Input, Button, Icon } from "@Components"
import styles from "./Tags.module.scss"
import { SpaceProps } from "@Components/Atoms/Space"
// #endregion Local Imports

interface BaseTag {
    title: string
    href?: string
    color?: "magenta" | "green" | "red" | "volcano" | "orange" | "gold" | "lime" | "cyan" | "blue" | "geekblue" | "purple"
}
interface defaultTag extends BaseTag {
    type?: "default"
}
export interface DeletableTag extends BaseTag {
    type: "deletable"
}
export interface CheckableTag extends BaseTag {
    type: "checkable"
    checked: boolean
}
export type Tag = defaultTag | DeletableTag | CheckableTag
interface TagsProps extends defaultProps {
    tagList: Tag[]
    onClick?: (tag: Tag) => void
    onAdd?: (text: string) => void
    boxProps?: SpaceProps
}

const Tags = (props: TagsProps): JSX.Element => {
    const { tagList, show, className, onClick, onAdd, boxProps, ...rest } = props

    const inputRef = useRef<HTMLInputElement>(null)
    const [openAddInput, setOpenAddInput] = useState(false)
    useEffect(() => {
        if (openAddInput === true) {
            inputRef.current?.focus()
        } else {
            setAddInput("")
        }
    }, [openAddInput])
    const [addInput, setAddInput] = useState("")
    const prefixCls = "tags"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    return (
        <Space className={classes} {...boxProps} {...rest}>
            {tagList.map((tag) => (
                <Button
                    size="small"
                    type={tag.type === "checkable" && tag.checked === true ? "primary" : "secondary"}
                    href={tag.href}
                    onClick={(e) => {
                        onClick?.(tag)
                    }}
                    key={tag.title}
                    className={classNames(styles[`${prefixCls}__btn`], {
                        [styles[`${prefixCls}__btn--${tag.color}`]]: tag.color && ((tag.type === "checkable" && !tag.checked) || tag.type === "deletable"),
                    })}
                >
                    {tag.title}
                    <Icon show={tag.type === "deletable"} iconName="xi-close" />
                </Button>
            ))}
            {onAdd ? (
                openAddInput ? (
                    <Input
                        style={{
                            width: "95px",
                        }}
                        ref={inputRef}
                        onBlur={() => {
                            setOpenAddInput(false)
                        }}
                        onEnter={() => {
                            onAdd(addInput)
                            setOpenAddInput(false)
                        }}
                        size="small"
                        value={addInput}
                        onChange={(e) => {
                            setAddInput(e.currentTarget.value)
                        }}
                    />
                ) : (
                    <Button
                        size="small"
                        type={"secondary"}
                        onClick={() => {
                            setOpenAddInput(true)
                        }}
                        className={classNames(styles[`${prefixCls}__btn-add`])}
                    >
                        <Icon iconName="xi-plus" />
                        New Tag
                    </Button>
                )
            ) : (
                ""
            )}
        </Space>
    )
}
export default Tags
