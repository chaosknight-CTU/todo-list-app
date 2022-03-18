//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const completedTodoList = document.querySelector(".completed-todo-list");

//Event Liseners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("Click", deleteCheck);
todoInput.addEventListener("keypress", (event) => {
	event.key === "Enter" && addTodo();
});

let jobs = [];

//functions

function addTodo() {
	const job = {
		id: Math.random().toString(36),
		task: todoInput.value,
	};
	todoInput.value = "";
	jobs.push(job);

	render();
}

function deleteCheck(id) {
	jobs = jobs.filter((job) => job.id !== id);
	render();
}

function complete(id) {
	jobs = jobs.map((job) => ({
		...job,
		complete: job.complete || (job.id === id && true),
	}));
	render();
}

function render() {
	const unCompleted = [];
	const completed = [];
	jobs.forEach((job) => {
		const task = document.createElement("li");
		task.className = "todo-item";

		const text = document.createElement("span");
		text.className = "todo";
		text.innerText = job.task;

		const checkButton = document.createElement("button");
		checkButton.className = "complete-btn";
		checkButton.innerHTML = '<li class="fas fa-check"></li>';
		checkButton.addEventListener("click", () => complete(job.id));

		const trashButton = document.createElement("button");
		trashButton.className = "trash-btn";
		trashButton.innerHTML = '<li class="fas fa-trash"></li>';
		trashButton.addEventListener("click", () => {
			task.classList.add("falling");
			setTimeout(() => {
				deleteCheck(job.id);
			}, 2000);
		});

		task.append(text);
		task.append(checkButton);
		task.append(trashButton);

		job.complete ? completed.push(task) : unCompleted.push(task);
	});
	todoList.innerHTML = "";
	completedTodoList.innerHTML = "";
	unCompleted.forEach((e) => todoList.append(e));
	completed.forEach((e) => completedTodoList.append(e));
}

render();
