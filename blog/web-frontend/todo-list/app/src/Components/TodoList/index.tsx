import React from "react";
import iconDelete from "Assets/images/icon_delete.svg";
import classnames from "classnames";
import style from "./TodoList.module.css";
import { NoTodo } from "Components";
import { dateFormat } from "Assets/ts/date_format";

export interface TodoItem {
    id: number;
    title: string;
    checked: boolean;
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
    const { id, title, checked, created } = todoItem;
    const { todoList, setTodoList } = stateTodoList;
    const toggleTodoItem = (todoId: TodoItem["id"]) =>
        setTodoList(
            todoList.map((todoItem) => ({
                ...todoItem,
                checked: todoItem.id === todoId ? !todoItem.checked : todoItem.checked,
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
                [style["todo-item--checked"]]: checked,
            })}
            onClick={() => toggleTodoItem(id)}
        >
            <div className={style["todo-item__check-box"]}>
                <div className={style["check-box"]}>
                    <input
                        type="checkbox"
                        defaultChecked={checked}
                        id={"todo" + id}
                        className={classnames(style["check-box__input"], {
                            [style["check-box__input--checked"]]: checked,
                        })}
                    />
                </div>
            </div>
            <div className={style["todo-item__main"]}>
                <h2
                    className={classnames(style["todo-item__title"], {
                        [style["todo-item--checked__title"]]: checked,
                    })}
                >
                    <label
                        htmlFor={"todo" + id}
                        className={classnames(style["todo-item__title-label"], {
                            [style["todo-item--checked__title-label"]]: checked,
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
                    [style["todo-item--checked__btn-delete"]]: checked,
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
