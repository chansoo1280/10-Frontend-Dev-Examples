// #region Global Imports
import React, { useEffect, useState } from "react"
import classNames from "classnames"
import Image, { ImageLoader } from "next/image"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Icon, Space, Button, Text, Popover, Card } from "@Components"
import styles from "./SiteHeader.module.scss"
import { useUser } from "@Hooks/useUser"
import { APILogoutGET, Http } from "@Services"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { ReqType } from "@Server/request"
import { usePrevPath } from "@Hooks/useHistoryBack"
import { useAccessToken } from "@Hooks/useAccessToken"
// #endregion Local Imports
const myLoader: ImageLoader = ({ src, width, quality }) => {
    return `/public/Images/${src}?w=${width}&q=${quality || 75}`
}
const SiteHeader = (props: defaultProps): JSX.Element => {
    const { show, className, ...rest } = props
    const { user, clearUser } = useUser()
    const { clearAccessToken } = useAccessToken()
    const { prevPath } = usePrevPath()
    const prefixCls = "site-header"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    const logout = async () =>
        await Http<APILogoutGET>(ReqType.GET, ["/api/account/logout"], {}).catch((e: ResMessageWithDesc) => {
            console.log(e)
            switch (e.status) {
                case ResStatus.BadRequest:
                    console.log(e.description)
                    return null

                default:
                    break
            }
            return null
        })

    const handleClickLogout = async () => {
        const user = await logout()
        if (user === null) {
            return
        }
        clearUser()
        clearAccessToken()
    }

    return (
        <Space className={classes} padding={user === null ? "4px 4px 4px 16px" : "4px 16px"} {...rest}>
            <Space.Box>
                <Text className={classNames(styles[`${prefixCls}__title`])}>Exeample Project</Text>
            </Space.Box>
            <Button className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text" icon={<Icon iconName="xi-search" />} />
            <Button className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text" icon={<Icon iconName="xi-help-o" />} />

            {user !== null && (
                <>
                    <Button show={user !== null} className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text" icon={<Icon iconName="xi-bell-o" />} />
                    <Popover
                        contents={
                            <>
                                <Space widthType="wide" padding="5px 12px">
                                    <Image loader={myLoader} src="me.png" alt="Picture of the user" width={24} height={24} />
                                    {user.name}
                                </Space>
                                <Space direction="vertical" widthType="wide" padding="12px 16px">
                                    <Text>asdasd</Text>
                                    <Button onClick={handleClickLogout} widthType="wide">
                                        로그아웃
                                    </Button>
                                </Space>
                            </>
                        }
                    >
                        <Button show={user !== null} className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text">
                            <Image loader={myLoader} src="me.png" alt="Picture of the user" width={24} height={24} />
                            {user.name}
                        </Button>
                    </Popover>
                </>
            )}
            <Button className={classNames(styles[`${prefixCls}__btn`])} size="small" type="text" icon={<Icon iconName="xi-translate" />} />
            <Space show={user === null}>
                <Button
                    href={{
                        pathname: "/account/login",
                        query: {
                            prevPath,
                        },
                    }}
                    size="small"
                >
                    Log in
                </Button>
                <Button
                    href={{
                        pathname: "/account/register",
                        query: {
                            prevPath,
                        },
                    }}
                    className={classNames(styles[`${prefixCls}__btn`])}
                    size="small"
                    type="secondary"
                >
                    Register
                </Button>
            </Space>
        </Space>
    )
}
export default SiteHeader
