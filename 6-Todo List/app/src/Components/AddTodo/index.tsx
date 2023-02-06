import React, { ChangeEvent, KeyboardEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import iconPlus from "Assets/images/icon_plus.svg";
import classnames from "classnames";
import style from "./AddTodo.module.css";
import { StateTodoList, TodoItem } from "Components/TodoList";

const AddTodo = ({ stateTodoList }: { stateTodoList: StateTodoList }) => {
    const { todoList, setTodoList } = stateTodoList;
    const [isOpenedAddTodo, setIsOpenedAddTodo] = useState(true);
    const [textInput, setTextInput] = useState("");
    const refAddTodoLayer = useRef<HTMLDivElement>(null);
    const refAddTodo = useRef<HTMLDivElement>(null);
    const refAddTodoInput = useRef<HTMLInputElement>(null);
    let newIdTodo = todoList.length ? todoList[todoList.length - 1].id + 1 : 0;
    const addTodoItem = (title: TodoItem["title"]) =>
        setTodoList([
            ...todoList,
            {
                id: newIdTodo++,
                title: title,
                isChecked: false,
                created: new Date(),
            },
        ]);
    const handleClickLayer: MouseEventHandler<HTMLDivElement> = (e) => {
        if (refAddTodo.current !== null && e.target !== null && e.target === refAddTodoLayer.current) {
            closeAddTodo();
        }
    };
    const openAddTodo = () => {
        setIsOpenedAddTodo(true);
    };
    const closeAddTodo = () => {
        setIsOpenedAddTodo(false);
        setTextInput("");
    };
    const handleClickBtnAddTodo = () => {
        if (isOpenedAddTodo) {
            if (textInput === "") return;
            addTodoItem(textInput);
            closeAddTodo();
        } else {
            openAddTodo();
        }
    };
    const handleChangeAddTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTextInput(e.target.value);
    };
    const handleKeyDownAddTodoInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleClickBtnAddTodo();
        }
    };
    useEffect(() => {
        if (isOpenedAddTodo) {
            refAddTodoInput.current?.focus();
        }
    }, [isOpenedAddTodo]);
    return (
        <>
            <div
                ref={refAddTodoLayer}
                onClick={handleClickLayer}
                className={classnames(style["add-todo-layer"], {
                    [style["add-todo-layer--hide"]]: !isOpenedAddTodo,
                })}
            ></div>
            <div
                className={classnames(style["add-todo"], {
                    [style["add-todo--open"]]: isOpenedAddTodo,
                })}
                ref={refAddTodo}
            >
                <div className={style["add-todo__input"]}>
                    <input
                        placeholder="Todo를 입력해주세요"
                        type="text"
                        id="addTodoInput"
                        value={textInput}
                        className={style["add-todo__text-input"]}
                        disabled={!isOpenedAddTodo}
                        ref={refAddTodoInput}
                        onChange={handleChangeAddTodoInput}
                        onKeyDown={handleKeyDownAddTodoInput}
                    />
                    <label className={classnames(style["add-todo__label"], "ir")} htmlFor="addTodoInput">
                        Todo 입력
                    </label>
                </div>
                <button
                    type="button"
                    className={style["add-todo__btn"]}
                    onClick={() => {
                        handleClickBtnAddTodo();
                    }}
                >
                    <img
                        src={iconPlus}
                        alt="항목 추가하기"
                        className={classnames(style["add-todo__btn-img"], "img-cover")}
                    />
                </button>
            </div>
        </>
    );
};

export default AddTodo;
