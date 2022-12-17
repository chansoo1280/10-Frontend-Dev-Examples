import "../styles/globals.css"
import type { AppProps } from "next/app"
import "@Utils/DateFormat"

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
