import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import "../../css/calendar.css";

export function AddTaskModal({ isOpen, onClose, onAddTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isStatic, setIsStatic] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      date: taskDate,
      startTime,
      endTime,
      note: notes,
      isStatic,
      color: "#3b82f6", // Default color
    };
    onAddTask(newTask); // Pass the task to the parent component
    resetForm();
    onClose(); // Close the modal
  };

  const resetForm = () => {
    setTaskName("");
    setTaskDate("");
    setStartTime("");
    setEndTime("");
    setIsStatic(false);
    setNotes("");
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            id="task-name"
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            id="task-date"
            label="Date"
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="start-time"
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            id="end-time"
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={isStatic}
                onChange={(e) => setIsStatic(e.target.checked)}
              />
            }
            label="Static Task"
          />
          <TextField
            id="notes"
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <DialogActions className="dialog-actions">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Add Task
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
