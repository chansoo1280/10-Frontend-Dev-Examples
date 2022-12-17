import { render, screen } from "@testing-library/react"
import Typography from "./index"
const { Text } = Typography
describe("Text", () => {
    it("renders a text", () => {
        render(<Text>안녕하세요</Text>)

        const text = screen.getByText("안녕하세요")

        expect(text).toBeInTheDocument()
    })
})
