// #region Global Imports
import type { AppProps } from "next/app"
import { Roboto } from "@next/font/google"
// #endregion Global Imports

// #region Local Imports
import "@Styles/reset.css"
import "@Utils/DateFormat"
// #endregion Local Imports

const roboto = Roboto({
    weight: ["400", "500", "700"],
    subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <style jsx global>{`
                html {
                    font-family: ${roboto.style.fontFamily};
                }
            `}</style>
            <Component {...pageProps} />
        </>
    )
}
