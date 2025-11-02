document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-task-button");
  const todoList = document.getElementById("todo-list");

  const emptyImage = document.querySelector(".empty-image");

  const toggleEmptyState = () => {
    emptyImage.style.display =
      todoList.children.length === 0 ? "block" : "none";
  };

  const addTask = (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (!taskText) {
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="checkbox" />
      <span>${taskText}</span>
    `;

    todoList.appendChild(li);
    taskInput.value = "";
    toggleEmptyState();
  };

  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask(e);
    }
  });
});
