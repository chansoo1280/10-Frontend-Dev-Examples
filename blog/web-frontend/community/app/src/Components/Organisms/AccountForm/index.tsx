// #region Global Imports
import React from "react"
import classNames from "classnames"
// #endregion Global Imports

// #region Local Imports
import { defaultProps, Text, Rows, Row } from "@Components"
import styles from "./AccountForm.module.scss"
// #endregion Local Imports

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
        <Rows as="form" className={classes} gap="22px" {...rest}>
            <Text as="h1" className={styles[`${prefixCls}__title`]}>
                Example Project
            </Text>

            <Row>
                <Text className={styles[`${prefixCls}__header`]}>{header}</Text>
            </Row>
            {children}
        </Rows>
    )
}

export default AccountForm
