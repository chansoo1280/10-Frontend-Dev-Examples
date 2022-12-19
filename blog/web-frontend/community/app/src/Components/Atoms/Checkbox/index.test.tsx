import { fireEvent, render, screen } from "@testing-library/react"
import Checkbox from "."
describe("Checkbox", () => {
    it("renders checkbox unchanged", () => {
        const handleChange = jest.fn()
        const { container } = render(<Checkbox onChange={handleChange} />)
        expect(container).toMatchSnapshot()
    })
    it("should render a checkbox with the class", () => {
        const handleChange = jest.fn()
        render(<Checkbox onChange={handleChange} data-testid="checkbox" />)

        const checkbox = screen.getByTestId("checkbox")
        expect(checkbox).toBeInTheDocument()
        expect(checkbox).toHaveClass("checkbox")
    })
    it("클릭 후 값 확인", () => {
        const handleChange = jest.fn()
        render(<Checkbox id="checkbox" label="체크박스" onChange={handleChange} data-testid="checkbox" />)

        const checkbox = screen.getByLabelText("체크박스")
        fireEvent.click(checkbox)
        expect(checkbox).toBeChecked()
    })
    it("비활성화 상태에서 클릭 후 값 확인", () => {
        const handleChange = jest.fn()
        render(<Checkbox id="checkbox" label="체크박스" onChange={handleChange} data-testid="checkbox" disabled />)

        const checkbox = screen.getByLabelText("체크박스")
        fireEvent.click(checkbox)
        expect(checkbox).not.toBeChecked()
    })
})
