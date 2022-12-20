import { fireEvent, render, screen } from "@testing-library/react"
import Breadcrumbs from "."
describe("Breadcrumbs", () => {
    it("renders breadcrumbs unchanged", () => {
        const { container } = render(<Breadcrumbs breadcrumbList={[{ title: "main" }, { title: "detail", href: "#a" }]} />)
        expect(container).toMatchSnapshot()
    })
    it("should render a breadcrumbs with the class", () => {
        render(<Breadcrumbs data-testid="breadcrumbs" breadcrumbList={[{ title: "main" }, { title: "detail", href: "#a" }]} />)

        const breadcrumbs = screen.getByTestId("breadcrumbs")
        expect(breadcrumbs).toBeInTheDocument()
        expect(breadcrumbs).toHaveClass("breadcrumbs")
    })
})
