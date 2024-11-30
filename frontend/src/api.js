const API_URL = "http://localhost:5000/api";

export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const login = async (userData) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const getTasks = async (token) => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const createTask = async (token, taskData) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskData),
  });
  return res.json();
};
