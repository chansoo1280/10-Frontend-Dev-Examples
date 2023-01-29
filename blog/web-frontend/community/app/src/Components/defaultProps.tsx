import { CSSProperties, FormEventHandler } from "react"

export interface defaultProps {
    children?: React.ReactNode
    id?: string
    className?: string
    disabled?: boolean
    show?: boolean
    "data-testid"?: string
    style?: CSSProperties
    action?: string
    onSubmit?: FormEventHandler
    tabIndex?: number
}
