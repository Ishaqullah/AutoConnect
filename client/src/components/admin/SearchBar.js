import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import Popover from "@mui/material/Popover";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuizIcon from "@mui/icons-material/Quiz";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import SettingsIcon from "@mui/icons-material/Settings";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
// import QuizIcon from "@mui/icons-material/Quiz";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import TranslateIcon from "@mui/icons-material/Translate";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
const SearchBar = () => {
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const openUserMenu = Boolean(userMenuAnchor);
  const userMenuId = openUserMenu ? "user-menu" : undefined;

  return (
    <AppBar position="inherit" sx={{ marginTop: "10px", borderRadius: "10px" }}>
         <Toolbar style={{ display: "flex", alignItems: "center" }}>
      <IconButton color="inherit"  onClick={handleOpenModal}>
          <SearchIcon />
        </IconButton>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
        >
            
          <IconButton color="inherit">
            <TranslateIcon />
          </IconButton>
          <IconButton color="inherit">
            <DarkModeIcon />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <Avatar onClick={handleUserClick} sx={{ cursor: "pointer" }}>
            <img
              src={"/Images/1.png"}
              alt="User"
              style={{
                width: "100%", // Ensure the image covers the entire circle
                height: "100%",
                objectFit: "cover", // Maintain aspect ratio and cover the circle
              }}
            />
          </Avatar>
        </div>
     
        <Popover
          id={userMenuId}
          open={openUserMenu}
          anchorEl={userMenuAnchor}
          onClose={handleCloseUserMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <QuizIcon />
            </ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItem>
        </Popover>

        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>Search Modal</DialogTitle>
          <List>
            <Link to="/Admin/Usertable" style={{textDecoration:"none" ,color:"inherit"}}><ListItemButton component="a" >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="User Details" />
            </ListItemButton></Link>
            <Link to="/Admin/Ads" style={{textDecoration:"none",color:"inherit"}}> <ListItemButton component="a">
              <ListItemIcon>
                <QuizIcon />
              </ListItemIcon>
              <ListItemText primary="Ad Details" />
            </ListItemButton></Link>
          </List>
        </Dialog>
        </Toolbar>
    </AppBar>
  );
};

export default SearchBar;
