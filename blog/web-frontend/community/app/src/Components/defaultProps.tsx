import { CSSProperties } from "react"

export interface defaultProps {
    children?: React.ReactNode
    id?: string
    className?: string
    disabled?: boolean
    show?: boolean
    "data-testid"?: string
    style?: CSSProperties
}
