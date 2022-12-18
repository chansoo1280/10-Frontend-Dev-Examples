import { useEffect, useState } from "react"

const useClickAnimating = () => {
    const [isClick, setIsClick] = useState<boolean | "pending">(false)
    const DELAY = 400
    const execClickAnimation = () => {
        if (isClick === true) {
            setIsClick("pending")
        } else {
            setIsClick(true)
        }
    }
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null
        if (isClick === "pending") {
            setIsClick(true)
        } else if (isClick === true) {
            setIsClick(true)
            timer = setTimeout(() => {
                setIsClick(false)
            }, DELAY)
        }
        return () => {
            if (timer) {
                window.clearTimeout(timer)
                timer = null
            }
        }
    }, [isClick])
    return { isClick, execClickAnimation }
}
export default useClickAnimating
