import { fireEvent, render, screen } from "@testing-library/react"
import Search from "./"
describe("Search", () => {
    it("renders search unchanged", () => {
        const handleChange = jest.fn()
        const handleSearch = jest.fn()
        const { container } = render(<Search value="" onChange={handleChange} onSearch={handleSearch} />)
        expect(container).toMatchSnapshot()
    })
    it("should render a search with the class", () => {
        const handleChange = jest.fn()
        const handleSearch = jest.fn()
        render(<Search placeholder="검색어를 입력해주세요" value="" onChange={handleChange} onSearch={handleSearch} data-testid="search" />)

        const search = screen.getByTestId("search")
        expect(search).toBeInTheDocument()
        expect(search).toHaveClass("search")
    })
    it("텍스트 입력 후 값 확인", () => {
        const handleChange = jest.fn()
        const handleSearch = jest.fn()
        render(<Search placeholder="검색어를 입력해주세요" value="" onChange={handleChange} onSearch={handleSearch} data-testid="search" />)

        const input = screen.getByPlaceholderText("검색어를 입력해주세요")
        fireEvent.change(input, { target: { value: "asdfasdf" } })
        expect(input).toHaveValue("asdfasdf")
        const button = screen.getByText("검색")
        fireEvent.click(button)
        expect(handleSearch).toBeCalledTimes(1)
    })
    it("비활성화 상태에서 텍스트 입력 후 값 확인", () => {
        const handleChange = jest.fn()
        const handleSearch = jest.fn()
        render(<Search disabled placeholder="검색어를 입력해주세요" value="" onChange={handleChange} onSearch={handleSearch} data-testid="search" />)

        const input = screen.getByPlaceholderText("검색어를 입력해주세요")
        fireEvent.change(input, { target: { value: "asdfasdf" } })
        expect(input).toHaveValue("")
    })
})
