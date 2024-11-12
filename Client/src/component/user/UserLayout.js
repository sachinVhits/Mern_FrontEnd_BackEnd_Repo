import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import "../../assets/style/global.css";
import Index from "../Index";

const UserLayout = () => {
  return (
    <Index.Box className="layout-container">
      <Header />
      <Index.Box className="main-layout">
        <SideBar />
        <main className="main-content">
          <Index.Outlet />
        </main>
      </Index.Box>
    </Index.Box>
  );
};

export default UserLayout;
