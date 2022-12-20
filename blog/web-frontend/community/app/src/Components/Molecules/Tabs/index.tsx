// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Space, Button } from "@Components"
import styles from "./Tabs.module.scss"
// #endregion Local Imports

export interface Tab {
    title: string
    href?: string
}
interface TabsProps extends defaultProps {
    activeIdx: number | null
    tabList: Tab[]
    onClick: (tab: Tab, idx: number) => void
}

const Tabs = (props: TabsProps): JSX.Element => {
    const { activeIdx, tabList, show, className, onClick, ...rest } = props
    const prefixCls = "tabs"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )
    return (
        <Space className={classes} {...rest}>
            {tabList.map((tab, idx) => (
                <Button
                    size="large"
                    type="text"
                    onClick={() => {
                        onClick(tab, idx)
                    }}
                    key={tab.title}
                    href={tab.href}
                    className={classNames(styles[`${prefixCls}__tab`], {
                        [styles[`${prefixCls}__tab--active`]]: activeIdx === idx,
                    })}
                >
                    {tab.title}
                </Button>
            ))}
        </Space>
    )
}
export default Tabs
