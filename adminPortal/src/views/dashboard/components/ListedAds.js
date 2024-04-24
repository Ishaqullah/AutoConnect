import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

// const advertisement = [
//   {
//     id: '1',
//     vehicleMake: 'Toyota',
//     vehicleModel: 'Corolla',
//     vehicleVariant: 'Xli',
//     sellerId: 'ishaq@gmail.com',
//   },
//   {
//     id: '2',
//     vehicleMake: 'Toyota',
//     vehicleModel: 'Corolla',
//     vehicleVariant: 'Xli',
//     sellerId: 'ishaq@gmail.com',
//   },
//   {
//     id: '3',
//     vehicleMake: 'Toyota',
//     vehicleModel: 'Corolla',
//     vehicleVariant: 'Xli',
//     sellerId: 'ishaq@gmail.com',
//   },
//   {
//     id: '4',
//     vehicleMake: 'Toyota',
//     vehicleModel: 'Corolla',
//     vehicleVariant: 'Xli',
//     sellerId: 'ishaq@gmail.com',
//   },
//   {
//     id: '5',
//     vehicleMake: 'Toyota',
//     vehicleModel: 'Corolla',
//     vehicleVariant: 'Xli',
//     sellerId: 'ishaq@gmail.com',
//   },
//   {
//     id: '6',
//     vehicleMake: 'Toyota',
//     vehicleModel: 'Corolla',
//     vehicleVariant: 'Xli',
//     sellerId: 'ishaq@gmail.com',
//   },
//   {
//     id: '7',
//     vehicleMake: 'Toyota',
//     vehicleModel: 'Corolla',
//     vehicleVariant: 'Xli',
//     sellerId: 'ishaq@gmail.com',
//   },
//   {
//     id: '8',
//     vehicleMake: 'Toyota',
//     vehicleModel: 'Corolla',
//     vehicleVariant: 'Xli',
//     sellerId: 'ishaq@gmail.com',
//   },
// ];

const ListedAds = () => {
  const [advertisement, setAdvertisement] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:5278/advertises/adDetails')
      .then((response) => setAdvertisement(response.data))
      .catch((error) => console.error('Error fetching Ads:', error));
  }, []);

 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedData = advertisement.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <DashboardCard title="Listed Ads">
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
                  Ad Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Vehicle Make
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Vehicle Model
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Vehicle Variant
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Seller Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  View Ad
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                    }}
                  >
                    {ad.advertiseID}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {ad.make}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ad.model}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {ad.variant}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {ad.seller.userEmail}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label="View Ad"
                    component={Link}
                    to={`/ad/${ad.id}`}
                    sx={{ color: '#7B7272', textDecoration: 'none' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={advertisement.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </DashboardCard>
  );
};

export default ListedAds;


