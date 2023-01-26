import { useCallback, useEffect } from "react"

export const useCallbackOutsideRef = <T extends Element>(ref: React.RefObject<T>, callback: (event: MouseEvent) => void) => {
    const handleClickOutside = useCallback(
        (event: MouseEvent) => {
            if (event.target instanceof Element && ref.current && !ref.current.contains(event.target)) {
                callback(event)
            }
        },
        [callback, ref],
    )
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside])
}
