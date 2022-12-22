import { render, screen } from "@testing-library/react"
import Card from "./"
describe("Card", () => {
    it("renders card unchanged", () => {
        const { container } = render(
            <Card>
                <div>1</div>
            </Card>,
        )
        expect(container).toMatchSnapshot()
    })
    it("should render a card with the class", () => {
        render(
            <Card data-testid="card">
                <div>1</div>
            </Card>,
        )

        const card = screen.getByTestId("card")
        expect(card).toBeInTheDocument()
        expect(card).toHaveClass("card")
    })
})
