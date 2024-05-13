import React from "react";
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

const Sidebar = ({sellerName}) => {
  return (
    <div className="sidebar">
      <Navbar/>
      <Search sellerName={sellerName}/>
      <Chats/>
    </div>
  );
};

export default Sidebar;