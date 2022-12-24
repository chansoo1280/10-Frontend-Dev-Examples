import { fireEvent, render, screen } from "@testing-library/react"
import QuestionList from "."
describe("QuestionList", () => {
    it("renders questionList unchanged", () => {
        const { container } = render(
            <QuestionList
                questionList={[
                    {
                        questionId: "1",
                        title: "title",
                        href: "#a",
                        userId: "1",
                    },
                ]}
            />,
        )
        expect(container).toMatchSnapshot()
    })
    it("should render a questionList with the class", () => {
        render(
            <QuestionList
                data-testid="questionList"
                questionList={[
                    {
                        questionId: "1",
                        title: "title",
                        href: "#a",
                        userId: "1",
                    },
                ]}
            />,
        )

        const questionList = screen.getByTestId("questionList")
        expect(questionList).toBeInTheDocument()
        expect(questionList).toHaveClass("question-list")
    })
})
