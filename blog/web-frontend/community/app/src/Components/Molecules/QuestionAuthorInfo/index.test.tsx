import { fireEvent, render, screen } from "@testing-library/react"
import QuestionAuthorInfo from "."
describe("QuestionAuthorInfo", () => {
    it("renders questionAuthorInfo unchanged", () => {
        const { container } = render(<QuestionAuthorInfo userName={""} created={""} />)
        expect(container).toMatchSnapshot()
    })
    it("should render a questionAuthorInfo with the class", () => {
        render(<QuestionAuthorInfo data-testid="questionAuthorInfo" userName={""} created={""} />)

        const questionAuthorInfo = screen.getByTestId("questionAuthorInfo")
        expect(questionAuthorInfo).toBeInTheDocument()
        expect(questionAuthorInfo).toHaveClass("text", "text--small", "question-author-info")
    })
})
