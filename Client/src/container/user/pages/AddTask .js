import React, { useState } from "react";
import Index from "../../../component/Index";
import "../../../assets/style/global.css";
const AddTask = ({ open, onClose }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    startDate: "",
    dueDate: "",
    status: "pending",
    priority: "medium",
    assignedTo: "",
    assignedBy: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (value, { resetForm }) => {
    resetForm();
  };

  return (
    <Index.Dialog open={open} onClose={onClose}>
      <Index.Box className="dialog">
        <Index.Box className="add-task-container">
          <Index.Typography
            className="add-task-title"
            variant="h4"
            gutterBottom
          >
            Add Task
          </Index.Typography>
          <form className="add-task-form" onSubmit={handleSubmit}>
            <Index.TextField
              label="Title"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
            <Index.TextField
              label="Description"
              name="description"
              value={task.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <Index.TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={task.startDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Index.TextField
              label="Due Date"
              name="dueDate"
              type="date"
              value={task.dueDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Index.TextField
              select
              label="Status"
              name="status"
              value={task.status}
              onChange={handleChange}
            >
              <Index.MenuItem value="pending">Pending</Index.MenuItem>
              <Index.MenuItem value="in-progress">In Progress</Index.MenuItem>
              <Index.MenuItem value="completed">Completed</Index.MenuItem>
            </Index.TextField>
            <Index.TextField
              select
              label="Priority"
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <Index.MenuItem value="low">Low</Index.MenuItem>
              <Index.MenuItem value="medium">Medium</Index.MenuItem>
              <Index.MenuItem value="high">High</Index.MenuItem>
            </Index.TextField>
            <Index.TextField
              label="Assigned To (User ID)"
              name="assignedTo"
              value={task.assignedTo}
              onChange={handleChange}
            />
            <Index.TextField
              label="Assigned By (User ID)"
              name="assignedBy"
              value={task.assignedBy}
              onChange={handleChange}
            />
            <Index.Button type="submit" variant="contained" color="primary">
              Add Task
            </Index.Button>
          </form>
        </Index.Box>
      </Index.Box>
    </Index.Dialog>
  );
};

export default AddTask;
