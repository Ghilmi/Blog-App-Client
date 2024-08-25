import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Drawer } from "@mui/material";
import { useState } from "react";
import CategoriesMenu from "../../components/Home/CategoriesMenu";
import { useNavigate } from "react-router-dom";

const actions = [
  { name: "search", icon: <i className="bi bi-search"></i> },
  { name: "posts", icon: <i className="bi bi-newspaper" /> },
  { name: "Home", icon: <i className="bi bi-house-fill" /> },
  { name: "categories", icon: <i className="bi bi-list" /> },
];

export default function SpeedDialTooltipOpen() {
  const [opendrawer, setOpendrawer] = useState(false);
  const naveTo = useNavigate();
  const toggleDrawer = (newOpen) => () => {
    setOpendrawer(newOpen);
  };
  const handelClick = (name) => {
    if (name.toLowerCase() === "categories") {
      toggleDrawer(true)();
    } else if (name.toLowerCase() === "posts") {
      naveTo("/posts");
    } else if (name.toLowerCase() === "search") {
      naveTo("/search");
    } else if (name.toLowerCase() === "Home") {
      naveTo("/");
    }
  };
  return (
    <>
      <Box
        sx={{
          height: 320,
          transform: "translateZ(0px)",
          flexGrow: 1,
          position: "sticky",
          bottom: 0,
          zIndex: 300,
        }}>
        <SpeedDial
          direction="up"
          ariaLabel="SpeedDial basic example"
          sx={{
            position: "absolute",
            bottom: { xs: 72, sm: 16 },
            right: 16,
            "& .MuiSpeedDial-fab": {
              scale: { xs: "0.6 !important", sm: "1 !important" },
            },
          }}
          icon={<SpeedDialIcon />}>
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handelClick(action.name)}
              sx={{
                display: {
                  xs: "block",
                  md: action.name === "categories" && "none",
                },
              }}
            />
          ))}
        </SpeedDial>
      </Box>
      <Drawer
        onClick={toggleDrawer(false)}
        open={opendrawer}
        onClose={toggleDrawer(false)}>
        <CategoriesMenu />
      </Drawer>
    </>
  );
}
