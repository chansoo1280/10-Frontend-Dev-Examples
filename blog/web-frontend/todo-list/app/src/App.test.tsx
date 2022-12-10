import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
const setup = () => {
    const addTodoBtnElement = screen.getByAltText("항목 추가하기");
    const addTodoInputElement = screen.getByPlaceholderText("Todo를 입력해주세요") as HTMLInputElement;
    return { addTodoBtnElement, addTodoInputElement };
};
test("confirm AddTodo", async () => {
    const { container } = render(<App />);
    const { addTodoBtnElement, addTodoInputElement } = setup();
    expect(addTodoBtnElement).toBeInTheDocument();

    // input 입력
    await userEvent.type(addTodoInputElement, "sdfsdf");
    expect(addTodoInputElement.value).toBe("sdfsdf");

    // add btn 클릭
    await userEvent.click(addTodoBtnElement);
    expect(container.querySelectorAll("li").length).toBe(1);
});

test("confirm TodoList", async () => {
    const { container } = render(<App />);

    // checkbox 클릭
    const checkBoxElement = screen.getByLabelText("sdfsdf") as HTMLInputElement;
    await userEvent.click(checkBoxElement);
    expect(checkBoxElement.checked).toBe(true);

    // delete btn 클릭
    const deleteBtnElement = await screen.findByAltText("항목 삭제 - sdfsdf");
    await userEvent.click(deleteBtnElement);
    expect(container.querySelectorAll("li").length).toBe(0);
});
