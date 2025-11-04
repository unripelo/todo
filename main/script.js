document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-task-button");
  const todoList = document.getElementById("todo-list");
  const emptyImage = document.querySelector(".empty-image");

  const toggleEmptyState = () => {
    emptyImage.style.display =
      todoList.children.length === 0 ? "block" : "none";
  };

  const addTask = (text, completed = false) => {
    const taskText = text || taskInput.value.trim();
    if (!taskText) {
      return;
    }

    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="checkbox" /> ${completed ? "checked" : ""}
      <span>${taskText}</span>
      <div class ="task-buttons">
        <button class="edit-button"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    const checkbox = li.querySelector(".checkbox");
    const editButton = li.querySelector(".edit-button");

    if (completed) {
      li.classList.add("completed");
      editButton.disabled = true;
      editButton.style.opacity = 0.5;
      editButton.style.pointerEvents = "none";
    }

    checkbox.addEventListener("change", () => {
      const isChecked = checkbox.checked;
      li.classList.toggle("completed", isChecked);
      editButton.disabled = isChecked;
      editButton.style.opacity = isChecked ? 0.5 : 1;
      editButton.style.pointerEvents = isChecked ? "none" : "auto";
    });

    editButton.addEventListener("click", () => {
      if (!checkbox.checked) {
        taskInput.value = li.querySelector("span").textContent;
        li.remove();
        toggleEmptyState();
      }
    });

    li.querySelector(".delete-button").addEventListener("click", () => {
      li.remove();
      toggleEmptyState();
    });

    todoList.appendChild(li);
    taskInput.value = "";
    toggleEmptyState();
  };

  addButton.addEventListener("click", () => addTask());
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTask();
    }
  });
});
