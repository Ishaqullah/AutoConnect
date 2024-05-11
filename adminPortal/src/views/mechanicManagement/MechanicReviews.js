import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TablePagination,
  SvgIcon,
  Rating
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { UpdateMechanic } from './components/UpdateMechanic';
import UpdateIcon from '@mui/icons-material/Update';
import axios from 'axios';
const MechanicReviews = () => {
  
  const [mechanicRatings, setMechanicRatings] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get('http://localhost:5278/mechanics/all-ratings')
      .then((response) => setMechanicRatings(response.data))
      .catch((error) => console.error('Error fetching mechanics review:', error));
  };

  const handleDelete = (id) => {
    if(window.confirm('Do you really want to delete rating with id '+ id +'?'))
    {
   axios
      .delete(`http://localhost:5278/mechanics/delete-ratings/${id}`)
      .then((response) => {
        console.log(response);
        fetchData();
      })
    .catch((error) => console.error('Error deleting record:', error));
    console.log(id);
    }
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedMechanic = [...mechanicRatings].sort((a, b) => a.mechanicId - b.mechanicId);
  const slicedData = sortedMechanic.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  return (
    <PageContainer title="Reviews Of Mechanics" description="this is Reviews of Mechanics">
      <DashboardCard title="Reviews Of Mechanics" marginTop="80px">
       
        <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: 'nowrap',
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Mechanic Id
                  </Typography>
                </TableCell>
                <TableCell align="center"> 
                  <Typography variant="subtitle2" fontWeight={600}>
                    Mechanic Name
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    User Email
                  </Typography>
                </TableCell>
                
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                     Rating
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    User Review
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedData.map((mechanics) => (
                <TableRow key={mechanics.ratingId}>
                  <TableCell align="center">
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      {mechanics.mechanicId}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle2" fontWeight={600}>
                      {mechanics.mechanicName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{mechanics.userEmail}</Typography>
                  </TableCell>
                  <TableCell color="textSecondary" variant="subtitle2" fontWeight={400} align="center">
                  <Rating name="half-rating-read" defaultValue={mechanics.rating} precision={0.5} readOnly />
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {mechanics.review}
                    </Typography>
                  </TableCell>
                 
                  <TableCell color="textSecondary" variant="subtitle2" fontWeight={400} align="center">
                  
                    <Button onClick={() => handleDelete(mechanics.ratingId)} >
                      <DeleteOutlineIcon/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={mechanicRatings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </DashboardCard>
      
    </PageContainer>
  );
};

export default MechanicReviews;
