import { fireEvent, render, screen } from "@testing-library/react"
import Tabs from "./"
describe("Tabs", () => {
    it("renders tabs unchanged", () => {
        const handleClick = jest.fn()
        const { container } = render(<Tabs activeIdx={0} onClick={handleClick} tabList={[{ title: "Tab 1" }]} />)
        expect(container).toMatchSnapshot()
    })
    it("should render a tabs with the class", () => {
        const handleClick = jest.fn()
        render(<Tabs activeIdx={0} data-testid="tabs" onClick={handleClick} tabList={[{ title: "Tab 1" }]} />)

        const tabs = screen.getByTestId("tabs")
        expect(tabs).toBeInTheDocument()
        expect(tabs).toHaveClass("tabs")
    })
    it("should render a tabs, checks for onClick attribute", () => {
        const handleClick = jest.fn()
        render(<Tabs activeIdx={0} data-testid="tabs" onClick={handleClick} tabList={[{ title: "Tab 1" }]} />)

        const button = screen.getByText("Tab 1")
        fireEvent.click(button)
        expect(handleClick).toBeCalledTimes(1)
    })
})
