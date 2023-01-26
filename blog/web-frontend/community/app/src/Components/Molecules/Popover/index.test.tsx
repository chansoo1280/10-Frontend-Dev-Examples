import { fireEvent, render, screen } from "@testing-library/react"
import Popover from "./"
describe("Popover", () => {
    it("renders popover unchanged", () => {
        const handleChange = jest.fn()
        const handlePopover = jest.fn()
        const { container } = render(<Popover value="" onChange={handleChange} onPopover={handlePopover} />)
        expect(container).toMatchSnapshot()
    })
    it("should render a popover with the class", () => {
        // const handleChange = jest.fn()
        // const handlePopover = jest.fn()
        // render(<Popover placeholder="검색어를 입력해주세요" value="" onChange={handleChange} onPopover={handlePopover} data-testid="popover" />)
        // const popover = screen.getByTestId("popover")
        // expect(popover).toBeInTheDocument()
        // expect(popover).toHaveClass("popover")
    })
})
