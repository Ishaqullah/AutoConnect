import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'
import {Typography} from "@mui/material";
import Image from "mui-image";
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <Image
          src={"/Images/steering-wheel.png"}
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
        <img src="/Images/1.png" alt="" />
        <span>{currentUser.displayName}</span>
        
      </div>
    </div>
  )
}

export default Navbar