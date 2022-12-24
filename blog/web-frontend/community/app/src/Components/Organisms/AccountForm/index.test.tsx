import { fireEvent, render, screen } from "@testing-library/react"
import AccountForm from "."
describe("AccountForm", () => {
    it("renders accountForm unchanged", () => {
        const { container } = render(<AccountForm />)
        expect(container).toMatchSnapshot()
    })
    it("should render a accountForm with the class", () => {
        render(<AccountForm data-testid="accountForm" />)

        const accountForm = screen.getByTestId("accountForm")
        expect(accountForm).toBeInTheDocument()
        expect(accountForm).toHaveClass("space", "site-header")
    })
})
