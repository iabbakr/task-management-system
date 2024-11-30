import { register, login, getTasks, createTask } from "./api.js";

let token = null;

document.getElementById("register-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await register({ username, email, password });
  if (response.token) {
    token = response.token;
    alert("Registration successful!");
    showTaskSection();
  } else {
    alert(response.error || "Registration failed!");
  }
});

document.getElementById("login-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await login({ email, password });
  if (response.token) {
    token = response.token;
    alert("Login successful!");
    showTaskSection();
    loadTasks();
  } else {
    alert(response.message || "Login failed!");
  }
});

document.getElementById("task-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  const deadline = document.getElementById("task-deadline").value;
  const priority = document.getElementById("task-priority").value;

  const response = await createTask(token, { title, description, deadline, priority });
  if (response._id) {
    alert("Task added successfully!");
    loadTasks();
  } else {
    alert(response.error || "Failed to add task!");
  }
});

const showTaskSection = () => {
  document.getElementById("auth-section").style.display = "none";
  document.getElementById("task-section").style.display = "block";
};

const loadTasks = async () => {
  const tasks = await getTasks(token);
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Priority: ${task.priority}</p>
      <p>Deadline: ${new Date(task.deadline).toLocaleDateString()}</p>
    `;
    taskList.appendChild(taskItem);
  });
};
