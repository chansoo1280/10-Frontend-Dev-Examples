import { ForwardRefExoticComponent, RefAttributes } from "react"
import DefaultLayout from "./DefaultLayout"
import AccountLayout from "./AccountLayout"
export interface LayoutProps {
    children?: React.ReactNode
}
export enum Layout {
    "DefaultLayout" = "DefaultLayout",
    "AccountLayout" = "AccountLayout",
}
export interface LayoutProps {
    children?: React.ReactNode
}

const TheLayout: {
    [key in Layout]: ForwardRefExoticComponent<LayoutProps & RefAttributes<HTMLDivElement>>
} = {
    [Layout.DefaultLayout]: DefaultLayout,
    [Layout.AccountLayout]: AccountLayout,
}
export default TheLayout
