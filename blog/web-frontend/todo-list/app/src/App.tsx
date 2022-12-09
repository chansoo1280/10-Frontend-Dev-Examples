import React from 'react';
// import logo from './logo.svg';l
import 'Assets/styles/style.css';
import iconList from 'Assets/images/icon_list.svg'
import iconPlus from 'Assets/images/icon_plus.svg'

function App() {
  return (
    <div id="app" className="l_app">
        <div id="wrap" className="l_wrap">
            <header id="header" className="header">
                <h1 className="header__title">My Todo List</h1>
                <span id="textProgress" className="header__text-progress">1 of 5 tasks</span>
                <div className="header__progress-bar">
                    <div id="progressBar" className="header__progress-bar-inner"></div>
                </div>
            </header>
            <main id="main" className="main">
                <ul id="todoList">
                </ul>
                <div id="noTodo" className="no-todo">
                    <img className="no-todo__img" src={iconList} alt="" />
                    <span className="no-todo__text">NO TODO</span>
                </div>
            </main>
        </div>
        <div id="addTodo" className="add-todo">
            <div className="add-todo__input">
                <input placeholder="Todo를 입력해주세요" type="text" id="addTodoInput" className="add-todo__text-input" />
                <label className="add-todo__label ir" htmlFor="addTodoInput">Todo 입력</label>
            </div>
            <button type="button" className="add-todo__btn" >
                <img src={iconPlus} alt="항목 추가하기" className="add-todo__btn-img img-cover" />
            </button>
        </div>
    </div>
  );
}

export default App;
