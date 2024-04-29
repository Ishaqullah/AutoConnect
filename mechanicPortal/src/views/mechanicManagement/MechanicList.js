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
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
const MechanicList = () => {
    const [mechanic, setMechanic] = useState([]);
    useEffect(() => {
      fetchData();
    }, []); 
    const fetchData = () => {
      axios
        .get('http://localhost:5278/mechanics')
        .then((response) => setMechanic(response.data))
        .catch((error) => console.error('Error fetching mechanics:', error));
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

    const slicedData = mechanic.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <PageContainer title="List Of Mechanics" description="this is list of Mechanics">
      <DashboardCard title="List Of Mechanics" marginTop="80px">
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
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Mechanic Id
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Mechanic Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                  Mechanic Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Address
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Phone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Average Rating
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedData.map((mechanics) => (
                <TableRow key={mechanics.mechanicId}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      {mechanics.mechanicId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {mechanics.mechanicName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{mechanics.mechanicEmail}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {mechanics.mechanicAddress}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {mechanics.mechanicPhone}
                    </Typography>
                  </TableCell>
                  <TableCell  color="textSecondary" variant="subtitle2" fontWeight={400}>
                  {mechanics.averageRating}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={mechanic.length}
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

export default MechanicList;
