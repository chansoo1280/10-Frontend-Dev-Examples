import React from "react";
import iconList from "Assets/images/icon_list.svg";
import style from "./NoTodo.module.css";

const NoTodo = () => {
    return (
        <div className={style["no-todo"]}>
            <img className={style["no-todo__img"]} src={iconList} alt="" />
            <span className={style["no-todo__text"]}>NO TODO</span>
        </div>
    );
};
export default NoTodo;
