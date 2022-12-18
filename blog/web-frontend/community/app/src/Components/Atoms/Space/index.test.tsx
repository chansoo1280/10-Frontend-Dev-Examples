import { render, screen } from "@testing-library/react"
import Space from "./"
describe("Space", () => {
    it("renders space unchanged", () => {
        const { container } = render(
            <Space>
                <div>1</div>
                <div>2</div>
                <Space.Box>3</Space.Box>
            </Space>,
        )
        expect(container).toMatchSnapshot()
    })
    it("should render a space with the class", () => {
        render(
            <Space data-testid="space">
                <div>1</div>
                <div>2</div>
                <Space.Box>3</Space.Box>
            </Space>,
        )

        const space = screen.getByTestId("space")
        expect(space).toBeInTheDocument()
        expect(space).toHaveClass("space")
    })
    it("should render a space with the class of virtical", () => {
        render(
            <Space direction="vertical" data-testid="space">
                <div>1</div>
                <div>2</div>
                <Space.Box>3</Space.Box>
            </Space>,
        )

        const space = screen.getByTestId("space")
        expect(space).toBeInTheDocument()
        expect(space).toHaveClass("space", "space--vertical")
    })
})
