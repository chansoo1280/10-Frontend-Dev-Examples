import { fireEvent, render, screen } from "@testing-library/react"
import Tags from "./"
describe("Tags", () => {
    it("renders tags unchanged", () => {
        const handleClick = jest.fn()
        const { container } = render(<Tags onClick={handleClick} tagList={[{ title: "Tag 1", checked: false, type: "checkable" }]} />)
        expect(container).toMatchSnapshot()
    })
    it("should render a tags with the class", () => {
        const handleClick = jest.fn()
        render(<Tags data-testid="tags" onClick={handleClick} tagList={[{ title: "Tag 1", checked: false, type: "checkable" }]} />)

        const tags = screen.getByTestId("tags")
        expect(tags).toBeInTheDocument()
        expect(tags).toHaveClass("tags")
    })
    it("should render a tags, checks for onClick attribute", () => {
        const handleClick = jest.fn()
        render(
            <Tags
                data-testid="tags"
                onClick={handleClick}
                tagList={[
                    { title: "Tag 1", checked: false, type: "checkable" },
                    { title: "Tag 2", type: "deletable" },
                ]}
            />,
        )

        const button = screen.getByText("Tag 1")
        fireEvent.click(button)
        expect(handleClick).toBeCalledTimes(1)
    })
})
