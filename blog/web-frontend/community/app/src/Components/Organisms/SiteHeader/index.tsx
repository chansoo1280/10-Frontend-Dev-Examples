// #region Global Imports
import React from "react"
import classNames from "classnames"
import Image, { ImageLoader } from "next/image"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Icon, Space, Button, Typography } from "@Components"
import styles from "./SiteHeader.module.scss"
// #endregion Local Imports
const { Text } = Typography
const myLoader: ImageLoader = ({ src, width, quality }) => {
    return `/public/Images/${src}?w=${width}&q=${quality || 75}`
}
const SiteHeader = (props: defaultProps): JSX.Element => {
    const { show, className, ...rest } = props
    const user = {}
    const prefixCls = "site-header"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )

    return (
        <Space className={classes} padding={user === null ? "4px 4px 4px 16px" : "4px 16px"} {...rest}>
            <Space.Box>
                <Text className={classNames(styles[`${prefixCls}__title`])}>Exeample Project</Text>
            </Space.Box>
            <Button className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text" icon={<Icon iconName="xi-search" />} />
            <Button className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text" icon={<Icon iconName="xi-help-o" />} />
            <Button className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text" icon={<Icon iconName="xi-bell-o" />} />

            <Button className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text">
                <Image loader={myLoader} src="me.png" alt="Picture of the user" width={24} height={24} />
                username
            </Button>

            <Button className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text" icon={<Icon iconName="xi-translate" />} />
            <Space show={user === null}>
                <Button href={"/login"} size="small">
                    Log in
                </Button>
                <Button className={classNames(styles[`${prefixCls}__btn`])} size="small" type="secondary">
                    Register
                </Button>
            </Space>
        </Space>
    )
}
export default SiteHeader
