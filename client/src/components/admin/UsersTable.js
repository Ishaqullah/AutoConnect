import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import {Typography} from "@mui/material";
const usersData = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  // Add more user data as needed...
];

const UsersTable = () => {
  const handleDelete = (userId) => {
    // Implement your delete functionality here using userId
    console.log(`Deleting user with ID: ${userId}`);
    // Make an API call or update state to delete the user
  };

  const handleUpdate = (userId) => {
    // Implement your update functionality here using userId
    console.log(`Updating user with ID: ${userId}`);
    // Redirect to update form or perform necessary actions
  };

  return (
    
    <>
    <Typography variant="h4" color={"#9D1515"} marginTop={"50px"}>
        <b>Manage Users</b>
      </Typography>
    <TableContainer component={Paper} sx={{marginTop:"20px"}}>
        
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleUpdate(user.id)}>
                    Update
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(user.id)} sx={{marginLeft:"5px"}}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersTable;
