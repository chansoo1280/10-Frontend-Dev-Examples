// #region Global Imports
import type { AppContext, AppInitialProps, AppProps } from "next/app"
import { Roboto } from "@next/font/google"
import { Hydrate, QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
// #endregion Global Imports

// #region Local Imports
import "@Styles/reset.css"
import { createRef } from "react"
import TheLayout, { Layout } from "@Components/Layouts"
// #endregion Local Imports

const queryClient = new QueryClient()

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
})
export interface PageProps {
    layout?: Layout
    dehydratedState?: any
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
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <AppLayout {...pageProps} ref={layoutRef}>
                        <Component {...pageProps} layoutRef={layoutRef} />
                    </AppLayout>
                    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
                </Hydrate>
            </QueryClientProvider>
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
