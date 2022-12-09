import { TodoList } from "Components/TodoList";

const Header = ({todoList}: {todoList: TodoList})=>{
    const lenTodoList = todoList.length;
	const lenCheckedTodoList = todoList.filter((todoItem) => todoItem.checked === true).length;

    return <header className="header">
    <h1 className="header__title">My Todo List</h1>
    <span className="header__text-progress">{todoList.length === 0?'no tasks':`${lenCheckedTodoList} of ${lenTodoList} tasks`}</span>
    <div className="header__progress-bar">
        <div style={{width: todoList.length === 0?0 + '%':100 * lenCheckedTodoList / lenTodoList + '%'}} className="header__progress-bar-inner"></div>
    </div>
</header>
}
export default Header