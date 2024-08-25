import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { useSelector } from "react-redux";
import { Paper } from "@mui/material";
const actions = [
  { name: "Home", icon: <i className="bi bi-house-fill" /> },
  { name: "posts", icon: <i className="bi bi-newspaper" /> },
  { name: "profile", icon: <i className="bi bi-person-circle" /> },
  { name: "search", icon: <i className="bi bi-search" /> },
  { name: "admin", icon: <i className="bi bi-gear" /> },
];

export default function LabelBottomNavigation() {
  const user = useSelector(selectUserFromAuth);
  const [value, setValue] = useState("recents");
  const naveTo = useNavigate();
  useEffect(() => {
    switch (value.toLowerCase()) {
      case "home":
        naveTo("/");
        break;

      case "posts":
        naveTo("/posts");
        break;

      case "profile":
        user && naveTo("/profile/" + user?._id);
        break;

      case "search":
        naveTo("/search");
        break;

      case "admin":
        user && naveTo("/admin-dashbord");
        break;

      default:
        console.log(null);
        break;
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      className="MuiPaper-root"
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: "flex", sm: "none" },
        shadow: "1 1 5px black",
        zIndex: 400,
        borderTop: "1px solid",
      }}
      value={value}
      onChange={handleChange}>
      {actions.map((action) => (
        <BottomNavigationAction
          key={action.name}
          disabled={
            (action.name === "profile" || action.name === "admin") && !user
          }
          label={action.name}
          value={action.name}
          icon={action.icon}
        />
      ))}
    </BottomNavigation>
  );
}
