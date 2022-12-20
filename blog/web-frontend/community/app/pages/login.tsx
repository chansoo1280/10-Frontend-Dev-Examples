import React, { useState } from "react"
import { Layout } from "@Components/Layouts"
import { PageProps } from "./_app"

const Login = () => {
    return (
        <>
            <div></div>
        </>
    )
}
export const getStaticProps = async (): Promise<{
    props: PageProps
}> => ({
    props: {
        layout: Layout.AccountLayout,
    },
})
export default Login
