import { fireEvent, render, screen } from "@testing-library/react"
import Rows from "."
describe("Rows", () => {
    it("renders rows unchanged", () => {
        const { container } = render(<Rows />)
        expect(container).toMatchSnapshot()
    })
    it("should render a rows with the class", () => {
        render(<Rows data-testid="rows" />)

        const rows = screen.getByTestId("rows")
        expect(rows).toBeInTheDocument()
        expect(rows).toHaveClass("rows")
    })
})
