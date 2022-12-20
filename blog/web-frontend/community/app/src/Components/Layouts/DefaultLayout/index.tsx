// #region Global Imports
import Head from "next/head"
// #endregion Global Imports

// #region Local Imports
import styles from "./DefaultLayout.module.scss"
import classNames from "classnames"
import { forwardRef } from "react"
import { LayoutProps } from ".."
import { SiteHeader } from "@Components"
// #endregion Local Imports

const DefaultLayout = ({ children }: LayoutProps, ref: React.ForwardedRef<HTMLDivElement>): JSX.Element => {
    const prefixCls = "wrap"
    return (
        <>
            <Head>
                <title>Dev Community</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div ref={ref} id="wrap" className={classNames(prefixCls, styles["default-layout"])}>
                <SiteHeader />
                {children}
            </div>
        </>
    )
}

export default forwardRef(DefaultLayout)
