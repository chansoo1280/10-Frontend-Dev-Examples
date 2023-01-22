// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Space, Button, Text, Icon } from "@Components"
import styles from "./IconList.module.scss"
import { SpaceProps } from "@Components/Atoms/Space"
import { IconNames } from "@Components/Atoms/Icon/IconNames"
// #endregion Local Imports

export interface IconItem {
    iconName: IconNames
    value: string
}
interface IconListProps extends defaultProps {
    iconList: IconItem[]
    BoxProps?: SpaceProps
}

const IconList = (props: IconListProps): JSX.Element => {
    const { iconList, BoxProps, show, className, ...rest } = props
    const prefixCls = "icon-list"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    return (
        <Space padding="5px 0" gap="16px" className={classes} separator={<div style={{ width: "1px", height: "16px", background: "#0000000F" }}></div>} {...BoxProps} {...rest}>
            {iconList.map(({ iconName, value }) => (
                <Text key={iconName} className={classNames(styles[`${prefixCls}__item`])}>
                    <Icon iconName={iconName} /> {value}
                </Text>
            ))}
        </Space>
    )
}
export default IconList
