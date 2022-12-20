// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Icon, Space, Button, Typography } from "@Components"
import styles from "./SiteHeader.module.scss"
// #endregion Local Imports
const { Text } = Typography

const SiteHeader = (props: defaultProps): JSX.Element => {
    const { show, className, ...rest } = props
    const prefixCls = "site-header"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    return (
        <Space className={classes} padding={"4px 4px 4px 16px"} {...rest}>
            <Space.Box>
                <Text>Exeample Project</Text>
            </Space.Box>
            <Button size="small" type="text" icon={<Icon iconName="xi-search" />} />
            <Button size="small" type="text" icon={<Icon iconName="xi-help-o" />} />
            <Button size="small" type="text" icon={<Icon iconName="xi-translate" />} />

            <Space>
                <Button size="small">Log in</Button>
                <Button size="small" type="secondary">
                    Register
                </Button>
            </Space>
        </Space>
    )
}
export default SiteHeader
