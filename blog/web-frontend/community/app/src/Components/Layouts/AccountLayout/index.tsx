// #region Global Imports
import Head from "next/head"
// #endregion Global Imports

// #region Local Imports
import styles from "./AccountLayout.module.scss"
import classNames from "classnames"
import { forwardRef } from "react"
import { LayoutProps } from ".."
// #endregion Local Imports

const AccountLayout = ({ children }: LayoutProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    const prefixCls = "wrap"
    return (
        <>
            <Head>
                <title>Dev Community</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div ref={ref} id="wrap" className={classNames(prefixCls, styles["account-layout"])}>
                {children}
                AccountLayout
            </div>
        </>
    )
}

export default forwardRef(AccountLayout)
