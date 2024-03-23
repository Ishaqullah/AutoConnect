import React from 'react'
import { CircularProgress } from '@mui/material'
const Loader = ({loading}) => {
  return (
    loading && ( // Show full-page overlay with CircularProgress when loading state is true
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Grey shadow background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="secondary" />{" "}
      {/* Centered CircularProgress */}
    </div>
  )
  )
}

export default Loader