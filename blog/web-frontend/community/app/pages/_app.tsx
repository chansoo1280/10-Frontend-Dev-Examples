// #region Global Imports
import type { AppContext, AppInitialProps, AppProps } from "next/app"
import { Roboto } from "@next/font/google"
// #endregion Global Imports

// #region Local Imports
import "@Styles/reset.css"
import "@Utils/DateFormat"
import { createRef } from "react"
import TheLayout, { Layout } from "@Components/Layouts"
// #endregion Local Imports

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
})
export interface PageProps {
    layout?: Layout
}
const App = ({ Component, pageProps }: AppProps<PageProps>) => {
    const layoutRef = createRef<HTMLDivElement>()
    const AppLayout = TheLayout[pageProps.layout !== undefined ? pageProps.layout : Layout.DefaultLayout]
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${roboto.style.fontFamily};
                }
            `}</style>
            <AppLayout {...pageProps} ref={layoutRef}>
                <Component {...pageProps} layoutRef={layoutRef} />
            </AppLayout>
        </>
    )
}

App.getInitialProps = async ({ Component, ctx }: AppContext): Promise<AppInitialProps> => {
    const pageProps: PageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return {
        pageProps: {
            ...pageProps,
            layout: pageProps.layout || Layout.DefaultLayout,
        },
    }
}
export default App
