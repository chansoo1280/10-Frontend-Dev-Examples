import { useCallback, useEffect } from "react"

const useScrollRestoration = (layoutRef: React.RefObject<HTMLDivElement>, pathname: string) => {
    const SCROLLTOP_SESSIONSTORAGE_KEY = "SCROLLTOP_SESSIONSTORAGE_KEY" + pathname
    const getStoredScrollTop = useCallback((): number | null => {
        if (typeof window === "undefined") {
            return null
        }
        return Number(sessionStorage.getItem(SCROLLTOP_SESSIONSTORAGE_KEY)) || 0
    }, [SCROLLTOP_SESSIONSTORAGE_KEY])
    const setStoredScrollTop = useCallback(
        (scrollTop: number): void => {
            sessionStorage.setItem(SCROLLTOP_SESSIONSTORAGE_KEY, String(Math.round(scrollTop / 10) * 10))
        },
        [SCROLLTOP_SESSIONSTORAGE_KEY],
    )

    const initScrollTop = useCallback(() => {
        const elWrap = layoutRef.current
        const scrollTop = getStoredScrollTop()
        if (elWrap === null || scrollTop === null) {
            return
        }
        elWrap.scrollTop = scrollTop
    }, [getStoredScrollTop, layoutRef])
    const handleScroll = useCallback(() => {
        const elWrap = layoutRef.current
        const scrollTop = elWrap?.scrollTop || getStoredScrollTop() || 0
        setStoredScrollTop(scrollTop)
    }, [getStoredScrollTop, layoutRef, setStoredScrollTop])
    useEffect(() => {
        const elWrap = layoutRef.current
        elWrap?.addEventListener("scroll", handleScroll)
        return () => {
            if (elWrap === null) {
                return
            }
            elWrap.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll, layoutRef])
    useEffect(() => {
        const elWrap = layoutRef.current
        return () => {
            if (elWrap === null) {
                return
            }
            elWrap.scrollTop = 0
        }
    }, [])
    return { initScrollTop }
}
export default useScrollRestoration
