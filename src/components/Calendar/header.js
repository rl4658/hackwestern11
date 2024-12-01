import React from "react";

export default function Header({ onImportTasks }) {
  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        const extractedTasks = extractTasksFromJson(jsonData);
        onImportTasks(extractedTasks); // Pass extracted tasks to the parent
      } catch (error) {
        console.error("Error parsing JSON file:", error);
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  const extractTasksFromJson = (data) => {
    const tasks = [];
    if (data?.schedules) {
      data.schedules.forEach((scheduleGroup) => {
        scheduleGroup.forEach((task) => {
          tasks.push({
            id: Date.now() + Math.random(), // Generate a unique ID
            name: task.TaskName, // Task name
            date: task.TaskStartTime.split("T")[0], // Extract date
            startTime: task.TaskStartTime.split("T")[1]?.substring(0, 5), // Extract start time (HH:mm)
            endTime: task.TaskEndTime.split("T")[1]?.substring(0, 5), // Extract end time (HH:mm)
            note: task.TaskDescription, // Note (TaskDescription)
            color: "#3b82f6", // Default color for imported tasks
          });
        });
      });
    }
    return tasks;
  };

  return (
    <header className="header-container">
      <h1 className="header-title">My Calendar</h1>
      <div className="header-actions">
        <button className="import-button">
          <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
            Import JSON
          </label>
        </button>
        <input
          id="file-upload"
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={handleFileImport}
        />
      </div>
    </header>
  );
}
