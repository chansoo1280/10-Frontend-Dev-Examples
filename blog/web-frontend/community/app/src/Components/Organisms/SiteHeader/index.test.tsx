import { fireEvent, render, screen } from "@testing-library/react"
import SiteHeader from "."
describe("SiteHeader", () => {
    it("renders siteHeader unchanged", () => {
        const { container } = render(<SiteHeader />)
        expect(container).toMatchSnapshot()
    })
    it("should render a siteHeader with the class", () => {
        render(<SiteHeader data-testid="siteHeader" />)

        const siteHeader = screen.getByTestId("siteHeader")
        expect(siteHeader).toBeInTheDocument()
        expect(siteHeader).toHaveClass("space", "site-header")
    })
})
