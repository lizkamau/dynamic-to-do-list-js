// script.js
// Dynamic To-Do List with Local Storage persistence

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------
  // Select DOM Elements
  // -------------------------------
  const addButton = document.getElementById('add-task-btn'); // Add Task button
  const taskInput = document.getElementById('task-input');   // Input field for new tasks
  const taskList = document.getElementById('task-list');     // UL where tasks are shown

  // In-memory array of tasks. Each task is an object: { id: string, text: string }
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  // -------------------------------
  // Helpers: Save / Load
  // -------------------------------
  // Save current tasks array to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Create a DOM element for a task and append it to the list
  // taskObj = { id: '...', text: '...' }
  function createTaskElement(taskObj) {
    const li = document.createElement('li');
    li.dataset.id = taskObj.id; // store id so we can remove by id later
    li.classList.add('task-item');

    const textSpan = document.createElement('span');
    textSpan.textContent = taskObj.text;
    textSpan.classList.add('task-text');

    // Create Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // When remove button is clicked, remove from DOM and update localStorage
    removeBtn.addEventListener('click', () => {
      removeTask(taskObj.id);
    });

    // Append elements
    li.appendChild(textSpan);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  // Load tasks from in-memory array (which was initialized from localStorage)
  function loadTasks() {
    // Clear current list just in case
    taskList.innerHTML = '';
    tasks.forEach(task => createTaskElement(task));
  }

  // -------------------------------
  // Core actions: Add / Remove
  // -------------------------------
  // Add a new task from the input field
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }

    // Create a unique id for the task
    const taskObj = {
      id: Date.now().toString() + '-' + Math.random().toString(36).slice(2),
      text: taskText
    };

    // Save in memory and DOM, then persist
    tasks.push(taskObj);
    createTaskElement(taskObj);
    saveTasks();

    // Clear input
    taskInput.value = '';
  }

  // Remove a task by id (update memory, DOM and localStorage)
  function removeTask(taskId) {
    // Update in-memory array
    tasks = tasks.filter(t => t.id !== taskId);
    // Persist changes
    saveTasks();
    // Remove from DOM
    const li = taskList.querySelector(`li[data-id="${taskId}"]`);
    if (li) li.remove();
  }

  // -------------------------------
  // Event listeners
  // -------------------------------
  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // -------------------------------
  // Initialize UI from Local Storage
  // -------------------------------
  loadTasks();
});

