const API_URL = 'http://localhost:3000/tasks';

$(document).ready(function () {
  // Initial load of tasks
  loadTasks();

  // Submit form to add a new task
  $('#taskForm').submit(function (e) {
    e.preventDefault();
    const title = $('#taskTitle').val();
    addTask({ title, completed: false });
  });

  // Update task completion status
  $(document).on('click', '.task-item', function () {
    const taskId = $(this).data('id');
    updateTask(taskId);
  });

  // Delete a task
  $(document).on('click', '.delete-task', function () {
    const taskId = $(this).data('id');
    deleteTask(taskId);
  });
});

// Load tasks from the API
function loadTasks() {
  $.get(API_URL, function (tasks) {
    displayTasks(tasks);
  });
}

// Display tasks in the UI
function displayTasks(tasks) {
  const taskList = $('#taskList');
  taskList.empty();

  tasks.forEach(task => {
    const listItem = $(`
      <li class="list-group-item task-item" data-id="${task.id}" style="cursor: pointer;">
        ${task.title} <span class="badge badge-primary badge-pill">${task.completed ? 'Done' : 'Pending'}</span>
        <button class="btn btn-danger btn-sm float-right delete-task" data-id="${task.id}">Delete</button>
      </li>
    `);
    taskList.append(listItem);
  });
}

// Add a new task to the API
function addTask(task) {
  $.post(API_URL, task, function () {
    loadTasks();
    $('#taskTitle').val('');
  });
}

// Update the completion status of a task
function updateTask(taskId) {
  $.ajax({
    url: `${API_URL}/${taskId}`,
    method: 'PATCH',
    success: function () {
      loadTasks();
    }
  });
}

// Delete a task from the API
function deleteTask(taskId) {
  $.ajax({
    url: `${API_URL}/${taskId}`,
    method: 'DELETE',
    success: function () {
      loadTasks();
    }
  });
}