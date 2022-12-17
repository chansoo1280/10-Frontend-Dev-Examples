import { ReactNode } from "react"

interface Props {
    children: ReactNode
}

const Text = ({ children }: Props) => {
    return <span>{children}</span>
}
const Typography = {
    Text,
}
export default Typography
