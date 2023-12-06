import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { RxRadiobutton } from "react-icons/rx";
import { IoIosRadioButtonOff } from "react-icons/io";
import { Collapse } from "@mui/material";
import DashboardSharpIcon from "@mui/icons-material/DashboardSharp";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideNavBar() {
  const [open, setOpen] = React.useState(true);
  const [hovered, setHovered] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (text) => {
    setSelectedItem(text);
  };
  const isActive = (text) => {
    return selectedItem === text;
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleHoverIn = () => {
    if (!hovered) {
      setHovered(true);
    }
  };

  const handleHoverOut = () => {
    if (hovered) {
      setHovered(false);
    }
  };

  const [dashboardOpen, setDashboardOpen] = useState(false);

  const handleDashboardClick = (text) => {
    setDashboardOpen(!dashboardOpen);
    handleItemClick(text);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
        variant="permanent"
        open={open || hovered}
      >
        <DrawerHeader>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            {open ? (
              <RxRadiobutton />
            ) : hovered ? (
              <IoIosRadioButtonOff />
            ) : null}
          </IconButton>
        </DrawerHeader>
        {open || hovered ? (
          <img src="images/13.png" alt="logo" />
        ) : (
          <img
            src="images/12.png"
            height={50}
            width={70}
            alt="logo"
          />
        )}

        <List>
          <ListItem
            key={"Dashboard"}
            disablePadding
            sx={{ display: "block" }}
            onClick={()=> {handleDashboardClick("Dashboard")}}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open || hovered ? "initial" : "center",
                px: 2.5,
                backgroundColor: isActive("Dashboard") ? "#EBEBEB" : "inherit",
                borderRadius: "10px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open || hovered ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardSharpIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Dashboards"}
                sx={{ opacity: open || hovered ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Collapse in={dashboardOpen}>
          <List>
            {["Single Site View", "Multi Site View"].map((text, index) => (
              <ListItem
                key={text}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => handleItemClick(text)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open || hovered ? "initial" : "center",
                    px: 2.5,
                    backgroundColor: isActive(text) ? "#97c55c" : "inherit",
                    borderRadius: "10px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open || hovered ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <FiberManualRecordOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ opacity: open || hovered ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>

        <Divider />

        <List>
          {["User Management", "Site Management"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleItemClick(text)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open || hovered ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: isActive(text) ? "#EBEBEB" : "inherit",
                  borderRadius: "10px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open || hovered ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? (
                    <PeopleOutlineOutlinedIcon />
                  ) : (
                    <ContentPasteOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open || hovered ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />
        <List>
          {["Export", "Analysis", "Report"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleItemClick(text)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open || hovered ? "initial" : "center",
                  px: 2.5,
                  backgroundColor: isActive(text) ? "#EBEBEB" : "inherit",
                  borderRadius: "10px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open || hovered ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <FolderOutlinedIcon />
                  ) : index === 1 ? (
                    <PieChartOutlineOutlinedIcon />
                  ) : (
                    <SignalCellularAltOutlinedIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open || hovered ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
