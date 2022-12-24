// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Space, Button } from "@Components"
import styles from "./Breadcrumbs.module.scss"
import { SpaceProps } from "@Components/Atoms/Space"
// #endregion Local Imports

export interface Breadcrumb {
    title: string
    href?: string
}
interface BreadcrumbsProps extends defaultProps {
    breadcrumbList: Breadcrumb[]
    BoxProps?: SpaceProps
}

const Breadcrumbs = (props: BreadcrumbsProps): JSX.Element => {
    const { breadcrumbList, BoxProps, show, className, ...rest } = props
    const breadcrumbListLen = breadcrumbList.length
    const prefixCls = "breadcrumbs"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    return (
        <Space separator="/" className={classes} {...BoxProps} {...rest}>
            {breadcrumbList.map((breadcrumb, idx) => (
                <Button
                    size="small"
                    type="text"
                    key={breadcrumb.title}
                    href={breadcrumb.href}
                    disabled={!breadcrumb.href}
                    className={classNames(styles[`${prefixCls}__breadcrumb`], {
                        [styles[`${prefixCls}__breadcrumb--last`]]: breadcrumbListLen - 1 === idx,
                        [styles[`${prefixCls}__breadcrumb--link`]]: breadcrumb.href,
                    })}
                >
                    {breadcrumb.title}
                </Button>
            ))}
        </Space>
    )
}
export default Breadcrumbs
