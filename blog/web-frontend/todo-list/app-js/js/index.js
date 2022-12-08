const useTodoList = (elApp) => {
	const elTodoList = elApp.querySelector('#todoList');
	const elTextProgress = elApp.querySelector('#textProgress');
	const elProgressBar = elApp.querySelector('#progressBar');
	const elNoTodo = elApp.querySelector('#noTodo');

	let todoList = [];
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
	const setProgressBar = (progress) => {
		elProgressBar.style.width = progress + '%';
	};
	const setTextProgress = (text) => {
		elTextProgress.innerHTML = text;
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
	const renderTodoList = () => {
		const lenTodoList = todoList.length;
		if (elTodoList === null) return;
		if (lenTodoList === 0) {
			setProgressBar(0);
			setTextProgress('no tasks');
			showNoTodo();
		} else {
			const lenCheckedTodoList = todoList.filter((todoItem) => todoItem.checked === true).length;
			setProgressBar(100 * lenCheckedTodoList / lenTodoList);
			setTextProgress(`${lenCheckedTodoList} of ${lenTodoList} tasks`);
			hideNoTodo();
		}
		elTodoList.innerHTML = todoList
			.map(
				(todoItem) =>
					`<li 
						class="${getClassNames({
							'todo-item': true,
							'todo-item--checked': todoItem.checked
						})}" tabindex="0" role="checkbox" aria-checked="${todoItem.checked}" aria-labelledby="todo${todoItem.id}" onclick="app.toggleTodo(${todoItem.id})">
						<div class="todo-item__check-box">
							<div class="check-box">
								<input type="checkbox" value="${todoItem.checked}" 
									class="${getClassNames({
										'check-box__input': true,
										'check-box__input--checked': todoItem.checked
									})}" tabindex="-1">
							</div>
						</div>
						<div class="todo-item__main">
							<h2 
								class="${getClassNames({
									'todo-item__title': true,
									'todo-item--checked__title': todoItem.checked
								})}">
								<label for="todo${todoItem.id}" 
									class="${getClassNames({
										'todo-item__title-label': true,
										'todo-item--checked__title-label': todoItem.checked
									})}">
									${todoItem.title}
								</label>
							</h2>
							<time datetime="${todoItem.created.toISOString() + '+09:00'}" class="todo-item__time">${todoItem.created.format(
						'ENa/p mh:m - yyyy/MM/dd'
					)}</time>
						</div>
						<button 
							class="${getClassNames({
								'todo-item__btn-delete': true,
								'todo-item--checked__btn-delete': todoItem.checked
							})}" onclick="app.deleteTodo(${todoItem.id})">
							<img src="./images/icon_delete.svg" alt="항목 삭제">
						</button>
					</li>`
			)
			.join('');
	};
	return [ addTodo, deleteTodo, toggleTodo, renderTodoList ];
};

const app = (() => {
	const elApp = document.getElementById('app');
	const elWrap = elApp.querySelector('#wrap');
	const elHeader = elApp.querySelector('#header');
	const elAddTodo = elApp.querySelector('#addTodo');
	const elAddTodoInput = elAddTodo.querySelector('#addTodoInput');
	const [ addTodo, deleteTodo, toggleTodo, renderTodoList ] = useTodoList(elApp);
	let isOpenAddTodo = false;

	const handleClickDoc = (e) => {
		if (e.path.includes(elAddTodo) === false) {
			closeAddTodo();
		}
	};
	const handleScrollDoc = (e) => {
		if (e.target.scrollTop !== 0) {
			elHeader.classList.add('header--scroll');
		} else {
			elHeader.classList.remove('header--scroll');
		}
	};
	const handleKeyDownAddTodoInput = (e) => {
		if (e.keyCode === 13) {
			onClickBtnAddTodo();
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
	const onClickBtnAddTodo = () => {
		if (isOpenAddTodo) {
			if (elAddTodoInput.value === '') return;
			addTodo(elAddTodoInput.value);
			closeAddTodo();
		} else {
			openAddTodo();
		}
	};
	const render = () => {
		renderTodoList();
		openAddTodo();
		elWrap.addEventListener('scroll', handleScrollDoc);
	};
	return {
		render,
		deleteTodo,
		toggleTodo,
		onClickBtnAddTodo,
		handleKeyDownAddTodoInput
	};
})();
app.render();
