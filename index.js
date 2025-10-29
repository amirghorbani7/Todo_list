const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const taskCounts = document.querySelector("#tasks-count");
const clearCompletedBtn = document.querySelector("#clear-completed");
const filterAllBtn = document.querySelector("#filter-all");
const filterActiveBtn = document.querySelector("#filter-active");
const filterCompletedBtn = document.querySelector("#filter-completed");

//  state
let todos = [];
let currentFilter = "all";

const renderTodos = () => {
  todoList.innerHTML = "";

  const filteredTodoLists = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return todo;
  });

  filteredTodoLists.forEach((todo) => {
    const li = document.createElement("li");

    li.classList.add(
      "fade-in",
      "flex",
      "items-center",
      "p-3",
      "border",
      "border-gray-300",
      "rounded-l"
    );

    if (todo.completed) li.classList.add("bg-gray-50");

    li.innerHTML = `

    <input type="checkbox" class="text-blue-500 mr-3 h-5 w-5" 
    ${todo.completed ? "checked" : ""} />

    <span class="flex-grow ${todo.completed ? "line-through" : ""}">${
      todo.text
    }</span>
    <button class= "delete-btn text-gray-400 hover:text-red-500 ml-2">X</button>
    `;

    const checkbox = li.querySelector(`input[type="checkbox"]`);

    checkbox.addEventListener("change", () => {
      todo.completed = !todo.completed;
      renderTodos();
    });
    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    });

    todoList.append(li);
  });

  taskCounts.textContent = todos.length;

  [
    {
      btn: filterAllBtn,
      filter: "all",
    },
    { btn: filterActiveBtn, filter: "active" },
    { btn: filterCompletedBtn, filter: "completed" },
  ].forEach((item) => {
    console.log(item, currentFilter);
    console.log(item.filter === currentFilter);

    if (item.filter === currentFilter) {
      item.btn.classList.add("bg-blue-500");
      item.btn.classList.remove("bg-gray-500");
    } else {
      item.btn.classList.remove("bg-blue-500");
      item.btn.classList.add("bg-gray-500");
    }
  });
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();

  if (text) {
    const newTodo = {
      text: text,
      completed: false,
      id: Date.now().toString(),
    };

    todos.push(newTodo);
    renderTodos();

    todoInput.value = "";
  } else alert("please enter the task");
});

clearCompletedBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.completed);
  renderTodos();
});

filterAllBtn.addEventListener("click", () => {
  currentFilter = "all";
  renderTodos();
});
filterCompletedBtn.addEventListener("click", () => {
  currentFilter = "completed";
  renderTodos();
});
filterActiveBtn.addEventListener("click", () => {
  currentFilter = "active";
  renderTodos();
});
