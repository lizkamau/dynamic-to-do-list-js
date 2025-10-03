// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // Select DOM Elements
  // -------------------------------
  const addButton = document.getElementById('add-task-btn'); // "Add Task" button
  const taskInput = document.getElementById('task-input');   // Input field
  const taskList = document.getElementById('task-list');     // Unordered list

  // -------------------------------
  // Function to add a new task
  // -------------------------------
  function addTask() {
    const taskText = taskInput.value.trim(); // Get input and trim spaces

    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create new <li> element for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create "Remove" button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-btn'); // ✅ Use classList.add

    // Remove task when button is clicked
    removeBtn.onclick = function() {
      taskList.removeChild(li);
    };

    // Append button to li and li to ul
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = "";
  }

  // -------------------------------
  // Event Listeners
  // -------------------------------
  // Add button click
  addButton.addEventListener('click', addTask);

  // Add task when pressing Enter
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
