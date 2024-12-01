"use client";
import React, { useState, useEffect } from "react";
import Button from "./ui/button";
import "../../css/calendar.css";

export function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addTask = () => {
    if (newTask.trim() !== "") {
      if (tasks.some((task) => task.name === newTask.trim())) {
        alert("Task already exists!");
        return;
      }
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), name: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-heading">My Tasks</h2>

      {/* Input for adding new tasks */}
      <div className="task-input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
          aria-label="New task input"
        />
        <Button
          onClick={addTask}
          className="add-task-button"
          aria-label="Add new task"
        >
          Add
        </Button>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-item ${task.completed ? "completed" : ""}`}
        >
          <div
            role="button"
            tabIndex="0"
            onClick={() => toggleComplete(task.id)}
            onKeyDown={(e) => e.key === "Enter" && toggleComplete(task.id)}
            className="task-name"
            aria-label={`Mark ${task.name} as ${task.completed ? "incomplete" : "complete"
              }`}
          >
            {task.name}
          </div>
          <Button
            variant="ghost"
            onClick={() => deleteTask(task.id)}
            aria-label={`Delete task ${task.name}`}
            className="delete-task-button"
          >
            Delete
          </Button>
        </div>
      ))}

      {/* Message when no tasks are available */}
      {tasks.length === 0 && (
        <p className="no-tasks-message">
          No tasks available. Add one above!
        </p>
      )}
    </div>
  );
}

export default TaskList;
