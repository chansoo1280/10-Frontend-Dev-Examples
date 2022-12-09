import { AddTodo } from 'Components/AddTodo';
import Header from 'Components/Header';
import { getLocalStorageTodoList, TodoList } from 'Components/TodoList';
import { useState } from 'react';



const App = () => {
    const [todoList, setTodoList] = useState<TodoList>(getLocalStorageTodoList());
    return (
        <div className="l_app">
            <div className="l_wrap">
                <Header todoList={todoList}/>
                <main className="main">
                    <TodoList todoList={todoList} setTodoList={setTodoList}/>
                </main>
                <AddTodo todoList={todoList} setTodoList={setTodoList}/>
            </div>
            
        </div>
    );
}

export default App;
