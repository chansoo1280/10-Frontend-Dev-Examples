import iconList from 'Assets/images/icon_list.svg'
import iconDelete from 'Assets/images/icon_delete.svg'
import React, { useEffect } from 'react';
import classnames from 'classnames'

export interface TodoItem {
    id: number,
    title: string,
    checked: boolean,
    created: Date
}
export type TodoList = TodoItem[]

const getLocalStorageTodoList = () => {
    const parsedList = JSON.parse(localStorage.getItem('todoList') || '[]');
    if (typeof parsedList.length !== 'number') return [];
    return parsedList.map((todoItem: TodoItem) => ({
        ...todoItem,
        created: new Date(todoItem.created)
    }));
};
const setLocalStorageTodoList = (list: TodoList) => localStorage.setItem('todoList', JSON.stringify(list));
const TodoList = (props: {
    todoList:TodoList, 
    setTodoList:React.Dispatch<React.SetStateAction<TodoList>>
}) => {
    const {todoList, setTodoList} = props;
    const toggleTodoItem = (todoId: TodoItem["id"]) => {
        setTodoList(todoList.map((todoItem)=>({
            ...todoItem,
            checked: todoItem.id === todoId?!todoItem.checked:todoItem.checked
        })));
    };
    const deleteTodoItem = (todoId: TodoItem["id"]) => {
        window.event?.stopPropagation();
        const todoItem = todoList.find((todoItem) => todoItem.id === todoId);
        if (todoItem === undefined) return;
        const idx = todoList.indexOf(todoItem);
        if (idx > -1) todoList.splice(idx, 1);
    };
    useEffect(()=>{
        setLocalStorageTodoList(todoList)
    }, [todoList])
    useEffect(()=>{
        
    }, [])
    return (
        <>
        {todoList.length === 0?
        <div className="no-todo">
            <img className="no-todo__img" src={iconList} alt="" />
            <span className="no-todo__text">NO TODO</span>
        </div>
        :<ul>
            {todoList
                .map(
                    ({ id, title, checked, created }) =>
                        <li
                            key={id}
                            className={classnames('todo-item', {
                                'todo-item--checked': checked
                            })} onClick={() => toggleTodoItem(id)}>
                            <div className="todo-item__check-box">
                                <div className="check-box">
                                    <input type="checkbox" defaultChecked={checked} id={"todo"+id}
                                        className={classnames('check-box__input', {
                                            'check-box__input--checked': checked
                                        })} />
                                </div>
                            </div>
                            <div className="todo-item__main">
                                <h2
                                    className={classnames('todo-item__title', {
                                        'todo-item--checked__title': checked
                                    })}>
                                    <label htmlFor={"todo"+id}
                                        className={classnames('todo-item__title-label', {
                                            'todo-item--checked__title-label': checked
                                        })}>
                                        {title}
                                    </label>
                                </h2>
                                <time dateTime={created.toISOString() + '+09:00'} className="todo-item__time">{created.format(
                                    'ENa/p mh:m - yyyy/MM/dd'
                                )}</time>
                            </div>
                            <button
                                className={classnames('todo-item__btn-delete', {
                                    'todo-item--checked__btn-delete': checked
                                })} onClick={() => deleteTodoItem(id)}>
                                <img src={iconDelete} alt={"항목 삭제 - "+title} />
                            </button>
                        </li>
                )}
        </ul>}
        </>
    )
}

export {getLocalStorageTodoList, TodoList}