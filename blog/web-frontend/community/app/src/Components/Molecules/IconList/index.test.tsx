import { fireEvent, render, screen } from "@testing-library/react"
import IconList from "."
describe("IconList", () => {
    it("renders iconList unchanged", () => {
        const { container } = render(<IconList iconList={[]} />)
        expect(container).toMatchSnapshot()
    })
    it("should render a iconList with the class", () => {
        render(<IconList data-testid="iconList" iconList={[]} />)

        const iconList = screen.getByTestId("iconList")
        expect(iconList).toBeInTheDocument()
        expect(iconList).toHaveClass("space", "icon-list")
    })
})
