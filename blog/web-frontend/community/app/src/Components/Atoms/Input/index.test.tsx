import { fireEvent, render, screen } from "@testing-library/react"
import Input from "./"
describe("Input", () => {
    it("renders input unchanged", () => {
        const handleChange = jest.fn()
        const { container } = render(<Input value="" onChange={handleChange} />)
        expect(container).toMatchSnapshot()
    })
    it("should render a input with the class", () => {
        const handleChange = jest.fn()
        render(<Input value="" onChange={handleChange} data-testid="input" />)

        const input = screen.getByTestId("input")
        expect(input).toBeInTheDocument()
        expect(input).toHaveClass("input")
    })
    it("텍스트 입력 후 값 확인", () => {
        const handleChange = jest.fn()
        render(<Input placeholder="입력해주세요" value="" onChange={handleChange} data-testid="input" />)

        const input = screen.getByPlaceholderText("입력해주세요")
        fireEvent.change(input, { target: { value: "asdfasdf" } })
        expect(input).toHaveValue("asdfasdf")
    })
    it("비활성화 상태에서 텍스트 입력 후 값 확인", () => {
        const handleChange = jest.fn()
        render(<Input placeholder="입력해주세요" value="" onChange={handleChange} data-testid="input" disabled />)

        const input = screen.getByPlaceholderText("입력해주세요")
        fireEvent.change(input, { target: { value: "asdfasdf" } })
        expect(input).toHaveValue("")
    })
})
