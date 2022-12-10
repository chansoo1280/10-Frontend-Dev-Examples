import React, { useEffect, useState } from "react";
import style from "./App.module.css";
import { getLocalStorageTodoList, setLocalStorageTodoList, TodoList, AddTodo, Header } from "Components";
const App = () => {
    const [todoList, setTodoList] = useState<TodoList>(getLocalStorageTodoList());
    const [isScroll, setIsScroll] = useState(false);
    const handleScrollWrap = (e: React.UIEvent<HTMLElement>) => {
        setIsScroll(e.currentTarget.scrollTop !== 0);
    };

    useEffect(() => {
        setLocalStorageTodoList(todoList);
    }, [todoList]);
    return (
        <div className={style["l_app"]}>
            <div className={style["l_wrap"]} onScroll={handleScrollWrap}>
                <Header isScroll={isScroll} todoList={todoList} />
                <main className={style["main"]}>
                    <TodoList stateTodoList={{ todoList, setTodoList }} />
                </main>
                <AddTodo stateTodoList={{ todoList, setTodoList }} />
            </div>
        </div>
    );
};

export default App;
