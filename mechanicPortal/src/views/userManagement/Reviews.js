import React from 'react';
import { Paper } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
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
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Stack, Rating } from '@mui/material';
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Reviews = () => {
  const { id } = useParams();
  // console.log({id});
  const [rating, setRating] = useState([]);

  useEffect(() => {
    fetchRating()
  }, [])
  const fetchRating = () => {
    axios
      .get(`http://localhost:5278/mechanics/ratings-reviews/${id}`)
      .then((response) => setRating(response.data))
      .catch((error) => console.error('Error fetching rating:', error))
  }
  // console.log(rating);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const slicedData = rating.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <PageContainer title="Reviews" description="this is Review">

      <DashboardCard title="Reviews" marginTop="80px">
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
                {/* <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    User Id
                  </Typography>
                </TableCell> */}
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    User Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    User Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Review
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Rating
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedData.map((ratings) => (
                <TableRow key={ratings.user.userId}>
                  {/* <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      {ratings.user.userId}
                    </Typography>
                  </TableCell> */}
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {ratings.user.userName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{ratings.user.userEmail}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      <Typography>{ratings.review}</Typography>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      <Typography><Stack direction="column" spacing={1} my={1}>
                        <Rating defaultValue={ratings.rating} readOnly />
                      </Stack></Typography>
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rating.length}
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

export default Reviews;
