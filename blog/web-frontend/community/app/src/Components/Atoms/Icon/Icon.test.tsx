import { render, screen } from "@testing-library/react"
import Icon from "./"
describe("Icon", () => {
    it("renders icon unchanged", () => {
        const { container } = render(<Icon iconName="xi-search" />)
        expect(container).toMatchSnapshot()
    })
    it("should render a icon with the class", () => {
        render(<Icon data-testid="icon" iconName="xi-search" />)

        const icon = screen.getByTestId("icon")
        expect(icon).toBeInTheDocument()
        expect(icon).toHaveClass("xi-icon", "xi-search")
    })
})
