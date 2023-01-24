import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export const useHistoryBack = (defaultBackPath: string) => {
    const router = useRouter()
    const historyBack = () => {
        if (router.query.prevPath !== undefined) {
            router.back()
        } else {
            router.replace(defaultBackPath)
        }
    }
    useEffect(() => {
        const asPathList = router.asPath.split("?")
        if (asPathList[1] !== undefined) {
            window?.history?.replaceState(window.history.state, "", asPathList[0])
        }
    }, [])
    return { historyBack }
}
export const usePrevPath = () => {
    const [prevPath, setPrevPath] = useState("")

    useEffect(() => {
        setPrevPath(window.location?.pathname + window.location?.search)
    }, [])
    return { prevPath }
}
