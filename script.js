// Wait until the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
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
    removeBtn.className = 'remove-btn';

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

  // Event listener for Add button
  addButton.addEventListener('click', addTask);

  // Event listener for pressing Enter in input
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
