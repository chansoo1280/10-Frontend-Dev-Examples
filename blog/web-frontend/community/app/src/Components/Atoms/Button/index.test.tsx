import { fireEvent, render, screen } from "@testing-library/react"
import Button from "./"
describe("Button", () => {
    it("renders button unchanged", () => {
        const { container } = render(<Button>클릭</Button>)
        expect(container).toMatchSnapshot()
    })
    it("should render a button with the class of primary", () => {
        render(<Button>클릭</Button>)

        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
        expect(button).toHaveClass("btn", "btn--primary")
    })
    it("should render a disabled button with the class of primary", () => {
        render(<Button disabled>클릭</Button>)
        const button = screen.getByRole("button")
        expect(button).toBeDisabled()
    })
    it("should render a button with the class of secondary", () => {
        render(<Button type="secondary">클릭</Button>)
        const button = screen.getByRole("button")
        expect(button).toHaveClass("btn", "btn--secondary")
    })
    it("should render a disabled button with the class of secondary", () => {
        render(
            <Button disabled type="secondary">
                클릭
            </Button>,
        )
        const button = screen.getByRole("button")
        expect(button).toHaveClass("btn", "btn--secondary")
        expect(button).toBeDisabled()
    })
    it("should render a button, checks for onClick attribute and primary class", () => {
        const handleClick = jest.fn()
        render(<Button onClick={handleClick}>클릭</Button>)

        const button = screen.getByRole("button")
        fireEvent.click(button)
        expect(handleClick).toBeCalledTimes(1)
        expect(button).toHaveClass("btn", "btn--primary")
    })
    it("should render a button as a Link, checks for href attribute and primary class", () => {
        render(<Button href="/">클릭</Button>)
        const buttonAsLink = screen.getByRole("link")
        expect(buttonAsLink).toHaveAttribute("href", "/")
        expect(buttonAsLink).toHaveClass("btn", "btn--primary")
    })
})
