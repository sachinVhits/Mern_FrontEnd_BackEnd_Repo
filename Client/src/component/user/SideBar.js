import React from "react";
import Index from "../Index";
import "../../assets/style/global.css";

const SideBar = () => {
  const navigate = Index.useNavigate();
  const handleNavigation = (text) => {
    if (text === "Task List") {
      navigate("/user/task");
    }
  };
  return (
    <Index.Drawer
      variant="permanent"
      className="sidebar"
      sx={{
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
        },
      }}
    >
      <Index.Box className="sidebar">
        <Index.Typography variant="h6" className="sidebar-title">
          Sidebar
        </Index.Typography>
      </Index.Box>
      <Index.List>
        {["Home", "About", "Contact", "Task List"].map((text) => (
          <Index.ListItem
            button
            key={text}
            className="sidebar-item"
            onClick={() => handleNavigation(text)}
          >
            <Index.ListItemText primary={text} />
          </Index.ListItem>
        ))}
      </Index.List>
    </Index.Drawer>
  );
};

export default SideBar;
