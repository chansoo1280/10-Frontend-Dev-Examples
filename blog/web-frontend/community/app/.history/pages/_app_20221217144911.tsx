import "/styles/reset.css"
import type { AppProps } from "next/app"
import "@Utils/DateFormat"
import { Roboto } from "@next/font/google"

const roboto = Roboto()

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}
