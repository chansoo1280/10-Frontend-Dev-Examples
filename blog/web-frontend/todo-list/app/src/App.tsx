import { AddTodo } from 'Components/AddTodo';
import Header from 'Components/Header';
import { getLocalStorageTodoList, TodoList } from 'Components/TodoList';
import { useRef, useState } from 'react';



const App = () => {
    const [todoList, setTodoList] = useState<TodoList>(getLocalStorageTodoList());
    const refWrap = useRef<HTMLDivElement>(null);
    const [isScroll, setIsScroll] = useState(false)

    const handleScrollWrap = (e: React.UIEvent<HTMLElement>) => {
		setIsScroll(e.currentTarget.scrollTop !== 0)
	};
    return (
        <div className="l_app">
            <div ref={refWrap} className="l_wrap" onScroll={handleScrollWrap}>
                <Header isScroll={isScroll} todoList={todoList}/>
                <main className="main">
                    <TodoList todoList={todoList} setTodoList={setTodoList}/>
                </main>
                <AddTodo todoList={todoList} setTodoList={setTodoList}/>
            </div>
            
        </div>
    );
}

export default App;
