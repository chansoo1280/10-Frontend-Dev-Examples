
import iconPlus from 'Assets/images/icon_plus.svg'
import classnames from "classnames";
import { TodoItem, TodoList } from "Components/TodoList";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const AddTodo = ({todoList, setTodoList}:  {todoList: TodoList, setTodoList: React.Dispatch<React.SetStateAction<TodoList>>})=>{
    const [isOpenedAddTodo, setIsOpenedAddTodo] = useState(true)
    const [textInput, setTextInput] = useState('')
    const elAddTodo = useRef<HTMLDivElement>(null);
    const elAddTodoInput = useRef<HTMLInputElement>(null);
    let newIdTodo = todoList.length ? todoList[todoList.length - 1].id + 1 : 0;
    const addTodoItem = (title: TodoItem["title"]) =>
        setTodoList([
            ...todoList,
            {
                id: newIdTodo++,
                title: title,
                checked: false,
                created: new Date()
            }
        ]);
    const handleClickDoc = (e:any) => {
		if (e.path.includes(elAddTodo.current) === false) {
			closeAddTodo();
		}
	};
	const openAddTodo = () => {
		setIsOpenedAddTodo(true);
		
	};
	const closeAddTodo = () => {
		setIsOpenedAddTodo(false);
		setTextInput('');
	};
	const handleClickBtnAddTodo = () => {
		if (isOpenedAddTodo) {
			if (textInput === '') return;
			addTodoItem(textInput);
			closeAddTodo();
		} else {
			openAddTodo();
		}
	};
    const handleChangeAddTodoInput = (e:ChangeEvent<HTMLInputElement>)=>{
        setTextInput(e.target.value)
    }
	const handleKeyDownAddTodoInput= (e:KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode === 13) {
			handleClickBtnAddTodo();
		}
	};
    useEffect(()=>{
        if(isOpenedAddTodo){
            elAddTodoInput.current?.focus();
            document.addEventListener('click', handleClickDoc);
        } else {
            document.removeEventListener('click', handleClickDoc);
        }
    }, [isOpenedAddTodo])
    return <div className={classnames("add-todo", {
        "add-todo--open": isOpenedAddTodo
    })} ref={elAddTodo}>
    <div className="add-todo__input">
        <input placeholder="Todo를 입력해주세요" type="text" id="addTodoInput" value={textInput} className="add-todo__text-input" disabled={!isOpenedAddTodo} ref={elAddTodoInput} onChange={handleChangeAddTodoInput} onKeyDown={handleKeyDownAddTodoInput}/>
        <label className="add-todo__label ir" htmlFor="addTodoInput">Todo 입력</label>
    </div>
    <button type="button" className="add-todo__btn" onClick={()=>{handleClickBtnAddTodo()}}>
        <img src={iconPlus} alt="항목 추가하기" className="add-todo__btn-img img-cover" />
    </button>
</div>
}

export {AddTodo}