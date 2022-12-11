import React from "react";
import iconDelete from "Assets/images/icon_delete.svg";
import classnames from "classnames";
import style from "./TodoList.module.css";
import { NoTodo } from "Components";
import { dateFormat } from "Assets/ts/date_format";
import CheckBox from "Components/CheckBox";

export interface TodoItem {
    id: number;
    title: string;
    isChecked: boolean;
    created: Date;
}
export type TodoList = TodoItem[];
export type StateTodoList = { todoList: TodoList; setTodoList: React.Dispatch<React.SetStateAction<TodoList>> };

const getLocalStorageTodoList = () => {
    const parsedList = JSON.parse(localStorage.getItem("todoList") || "[]");
    if (Array.isArray(parsedList) === false) return [];
    return parsedList.map((todoItem: TodoItem) => ({
        ...todoItem,
        created: new Date(todoItem.created),
    }));
};
const setLocalStorageTodoList = (list: TodoList) => localStorage.setItem("todoList", JSON.stringify(list));

const TodoItem = ({ todoItem, stateTodoList }: { todoItem: TodoItem; stateTodoList: StateTodoList }) => {
    const { id, title, isChecked, created } = todoItem;
    const { todoList, setTodoList } = stateTodoList;
    const toggleTodoItem = (todoId: TodoItem["id"]) =>
        setTodoList(
            todoList.map((todoItem) => ({
                ...todoItem,
                isChecked: todoItem.id === todoId ? !todoItem.isChecked : todoItem.isChecked,
            })),
        );
    const deleteTodoItem = (todoId: TodoItem["id"]) => {
        window.event?.stopPropagation();
        const todoItem = todoList.find((todoItem) => todoItem.id === todoId);
        if (todoItem === undefined) return;
        const idx = todoList.indexOf(todoItem);
        if (idx > -1) todoList.splice(idx, 1);
    };
    return (
        <li
            className={classnames(style["todo-item"], {
                [style["todo-item--isChecked"]]: isChecked,
            })}
            onClick={() => toggleTodoItem(id)}
        >
            <div className={style["todo-item__check-box"]}>
                <CheckBox id={id} isChecked={isChecked} />
            </div>
            <div className={style["todo-item__main"]}>
                <h2
                    className={classnames(style["todo-item__title"], {
                        [style["todo-item--checked__title"]]: isChecked,
                    })}
                >
                    <label
                        htmlFor={`todo ${id}`}
                        className={classnames(style["todo-item__title-label"], {
                            [style["todo-item--checked__title-label"]]: isChecked,
                        })}
                    >
                        {title}
                    </label>
                </h2>
                <time dateTime={created.toISOString() + "+09:00"} className={style["todo-item__time"]}>
                    {dateFormat(created, "ENa/p mh:m - yyyy/MM/dd")}
                </time>
            </div>
            <button
                className={classnames(style["todo-item__btn-delete"], {
                    [style["todo-item--checked__btn-delete"]]: isChecked,
                })}
                onClick={() => deleteTodoItem(id)}
            >
                <img src={iconDelete} alt={`항목 삭제 - ${title}`} />
            </button>
        </li>
    );
};

const TodoList = ({ stateTodoList }: { stateTodoList: StateTodoList }) => {
    const { todoList } = stateTodoList;
    return todoList.length === 0 ? (
        <NoTodo />
    ) : (
        <ul>
            {todoList.map((todoItem) => (
                <TodoItem key={todoItem.id} todoItem={todoItem} stateTodoList={stateTodoList} />
            ))}
        </ul>
    );
};

export { getLocalStorageTodoList, setLocalStorageTodoList, TodoList };
