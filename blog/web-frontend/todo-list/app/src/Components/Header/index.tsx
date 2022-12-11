import React from "react";
import classnames from "classnames";
import { TodoList } from "Components";
import style from "./Header.module.css";

const Header = ({ todoList, isScroll }: { todoList: TodoList; isScroll: boolean }) => {
    const lenTodoList = todoList.length;
    const lenCheckedTodoList = todoList.filter((todoItem) => todoItem.checked === true).length;
    const textProgressBarContents =
        todoList.length === 0 ? "no tasks" : `${lenCheckedTodoList} of ${lenTodoList} tasks`;
    const progressBarWidth = todoList.length === 0 ? 0 + "%" : (100 * lenCheckedTodoList) / lenTodoList + "%";
    return (
        <header
            className={classnames(style["header"], {
                [style["header--scroll"]]: isScroll,
            })}
        >
            <h1 className={style["header__title"]}>My Todo List</h1>
            <span className={style["header__text-progress"]}>{textProgressBarContents}</span>
            <div className={style["header__progress-bar"]}>
                <div style={{ width: progressBarWidth }} className={style["header__progress-bar-inner"]}></div>
            </div>
        </header>
    );
};
export default Header;
