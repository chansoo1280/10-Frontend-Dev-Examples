const useProgressBar = (elApp) => {
	const elProgressBar = elApp.querySelector('#progressBar');
	const elTextProgress = elApp.querySelector('#textProgress');

	const setProgressBar = (curLen, totalLen) => {
		elProgressBar.style.width = 100 * curLen / totalLen + '%';
		elTextProgress.innerHTML = `${curLen} of ${totalLen} tasks`;
	};
	const setEmptyProgressBar = () => {
		elProgressBar.style.width = 0 + '%';
		elTextProgress.innerHTML = 'no tasks';
	};
	return { setProgressBar, setEmptyProgressBar };
};
const useTodoList = (elApp) => {
	const elTodoList = elApp.querySelector('#todoList');
	const elNoTodo = elApp.querySelector('#noTodo');
	const { setProgressBar, setEmptyProgressBar } = useProgressBar(elApp);

	const getLocalStorageTodoList = () => {
		const parsedList = JSON.parse(localStorage.getItem('todoList') || '[]');
		if (typeof parsedList.length !== 'number') return [];
		return parsedList.map((todoItem) => ({
			...todoItem,
			created: new Date(todoItem.created)
		}));
	};
	const setLocalStorageTodoList = (list) => localStorage.setItem('todoList', JSON.stringify(list));

	let todoList = getLocalStorageTodoList();
	const setTodoList = (newTodoList) => {
		todoList = newTodoList;
		renderTodoList();
	};
	let newIdTodo = todoList.length ? todoList[todoList.length - 1].id + 1 : 0;

	const addTodo = (title) =>
		setTodoList([
			...todoList,
			{
				id: newIdTodo++,
				title: title,
				checked: false,
				created: new Date()
			}
		]);
	const toggleTodo = (todoId) => {
		const todoItem = todoList.find((todoItem) => todoItem.id === todoId);
		todoItem.checked = !todoItem.checked;
		setTodoList(todoList);
	};
	const deleteTodo = (todoId) => {
		window.event.stopPropagation();
		const idx = todoList.indexOf(todoList.find((todoItem) => todoItem.id === todoId));
		if (idx > -1) todoList.splice(idx, 1);
		setTodoList(todoList);
	};

	const showNoTodo = () => elNoTodo.classList.add('no-todo--show');
	const hideNoTodo = () => elNoTodo.classList.remove('no-todo--show');

	const getClassNames = (classObj) => {
		const classList = [];
		for (let [ key, value ] of Object.entries(classObj)) {
			if (value) classList.push(key);
		}
		return classList.join(' ');
	};
	const initTodoList = () => renderTodoList();
	const renderTodoList = () => {
		const lenTodoList = todoList.length;
		const lenCheckedTodoList = todoList.filter((todoItem) => todoItem.checked === true).length;
		if (elTodoList === null) return;
		setLocalStorageTodoList(todoList);
		if (lenTodoList === 0) {
			setEmptyProgressBar();
			showNoTodo();
		} else {
			setProgressBar(lenCheckedTodoList, lenTodoList);
			hideNoTodo();
		}
		elTodoList.innerHTML = todoList
			.map(
				({ id, title, checked, created }) =>
					`<li 
						class="${getClassNames({
							'todo-item': true,
							'todo-item--checked': checked
						})}" tabindex="0" role="checkbox" aria-checked="${checked}" aria-labelledby="todo${id}" onclick="app.toggleTodo(${id})">
						<div class="todo-item__check-box">
							<div class="check-box">
								<input type="checkbox" value="${checked}" 
									class="${getClassNames({
										'check-box__input': true,
										'check-box__input--checked': checked
									})}" tabindex="-1">
							</div>
						</div>
						<div class="todo-item__main">
							<h2 
								class="${getClassNames({
									'todo-item__title': true,
									'todo-item--checked__title': checked
								})}">
								<label for="todo${id}" 
									class="${getClassNames({
										'todo-item__title-label': true,
										'todo-item--checked__title-label': checked
									})}">
									${title}
								</label>
							</h2>
							<time datetime="${created.toISOString() + '+09:00'}" class="todo-item__time">${created.format(
						'ENa/p mh:m - yyyy/MM/dd'
					)}</time>
						</div>
						<button 
							class="${getClassNames({
								'todo-item__btn-delete': true,
								'todo-item--checked__btn-delete': checked
							})}" onclick="app.deleteTodo(${id})">
							<img src="./images/icon_delete.svg" alt="항목 삭제">
						</button>
					</li>`
			)
			.join('');
	};
	return { initTodoList, addTodo, deleteTodo, toggleTodo };
};
const useAddTodo = (elApp, addTodo) => {
	const elAddTodo = elApp.querySelector('#addTodo');
	const elAddTodoInput = elAddTodo.querySelector('#addTodoInput');
	let isOpenAddTodo = false;

	const handleClickDoc = (e) => {
		if (e.path.includes(elAddTodo) === false) {
			closeAddTodo();
		}
	};
	const openAddTodo = () => {
		isOpenAddTodo = true;
		elAddTodo.classList.add('add-todo--open');
		elAddTodoInput.disabled = false;
		elAddTodoInput.focus();
		document.addEventListener('click', handleClickDoc);
	};
	const closeAddTodo = () => {
		isOpenAddTodo = false;
		elAddTodo.classList.remove('add-todo--open');
		elAddTodoInput.disabled = true;
		elAddTodoInput.value = '';
		document.removeEventListener('click', handleClickDoc);
	};
	const handleClickBtnAddTodo = () => {
		if (isOpenAddTodo) {
			if (elAddTodoInput.value === '') return;
			addTodo(elAddTodoInput.value);
			closeAddTodo();
		} else {
			openAddTodo();
		}
	};
	const handleKeyDownAddTodoInput = () => {
		if (window.event.keyCode === 13) {
			handleClickBtnAddTodo();
		}
	};
	const initAddTodo = () => openAddTodo();
	return { initAddTodo, handleClickBtnAddTodo, handleKeyDownAddTodoInput };
};
const useHeader = (elApp) => {
	const elWrap = elApp.querySelector('#wrap');
	const elHeader = elApp.querySelector('#header');
	const handleScrollDoc = (e) => {
		if (e.target.scrollTop !== 0) {
			elHeader.classList.add('header--scroll');
		} else {
			elHeader.classList.remove('header--scroll');
		}
	};
	const initHeader = () => {
		elWrap.addEventListener('scroll', handleScrollDoc);
	};
	return { initHeader };
};
const app = (() => {
	const elApp = document.getElementById('app');
	const { initTodoList, addTodo, deleteTodo, toggleTodo } = useTodoList(elApp);
	const { initAddTodo, handleClickBtnAddTodo, handleKeyDownAddTodoInput } = useAddTodo(elApp, addTodo);
	const { initHeader } = useHeader(elApp);

	const render = () => {
		initTodoList();
		initAddTodo();
		initHeader();
	};
	return {
		render,
		deleteTodo,
		toggleTodo,
		handleClickBtnAddTodo,
		handleKeyDownAddTodoInput
	};
})();
app.render();
