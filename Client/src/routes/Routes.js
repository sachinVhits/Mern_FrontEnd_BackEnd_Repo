import React from "react";
import { BrowserRouter, Route, Routes as Routess } from "react-router-dom";
import SignUp from "../container/user/auth/SignUp";
import Login from "../container/user/auth/SignIn";
import DashBoard from "../container/user/pages/DashBoard";
import UserLayout from "../component/user/UserLayout";
import AddTask from "../container/user/pages/AddTask ";
import TaskList from "../container/user/pages/TaskList";
const Routes = () => {
  return (
    <BrowserRouter>
      <Routess>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserLayout />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="task" element={<TaskList />} />
        </Route>
      </Routess>
    </BrowserRouter>
  );
};

export default Routes;
