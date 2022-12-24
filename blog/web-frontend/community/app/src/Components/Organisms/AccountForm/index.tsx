// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Icon, Space, Button, Typography, Input, Checkbox } from "@Components"
import styles from "./AccountForm.module.scss"
// #endregion Local Imports
const { Text } = Typography

interface AccountFormProps extends defaultProps {
    header?: string
}
const AccountForm = (props: AccountFormProps): JSX.Element => {
    const { header, children, show, className, ...rest } = props
    const prefixCls = "account-form"
    const classes = classNames(
        styles[`${prefixCls}`],
        {
            [styles[`${prefixCls}--hide`]]: show === false,
        },
        className,
    )

    return (
        <Space className={classes} gap="22px" direction="vertical" {...rest}>
            <Text className={styles[`${prefixCls}__title`]}>Example Project</Text>

            <Space padding="0" widthType="wide">
                <Text className={styles[`${prefixCls}__header`]}>{header}</Text>
            </Space>
            {children}
        </Space>
    )
}
export default AccountForm
