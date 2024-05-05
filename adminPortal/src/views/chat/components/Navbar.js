import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../../../firebase'
import { AuthContext } from "../../../context/AuthContext";
import {Typography} from "@mui/material";
import Image from "mui-image";
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <Image
          src={"/logo/logo.png"}
          width={15}
          height={15}
          alt="Steering Wheel"
        />
        <Typography variant="body2" sx={{ color: "common.black" }}>
          <b>Auto</b>
        </Typography>
        <Typography variant="body2" sx={{ color: "secondary.main" }}>
          <b>Connect</b>
        </Typography>
      <div className="user">
        <img src="/images/profile/user-1.jpg" alt="" />
        <span>{currentUser.displayName}</span>
        
      </div>
    </div>
  )
}

export default Navbar