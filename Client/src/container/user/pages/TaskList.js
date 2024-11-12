import React, { useState } from "react";
import Index from "../../../component/Index";
import "../../../assets/style/global.css";
import AddTask from "./AddTask ";
const TaskList = () => {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Index.Box>
      <Index.Box className="main-box-button">
        <Index.Button onClick={handleButtonClick}>Add Task</Index.Button>
      </Index.Box>
      <AddTask open={open} onClose={handleClose} />
    </Index.Box>
  );
};

export default TaskList;
