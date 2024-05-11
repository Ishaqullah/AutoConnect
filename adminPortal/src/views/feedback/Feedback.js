import React,{ useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
    Rating
  } from '@mui/material';
  import PageContainer from 'src/components/container/PageContainer';
  import DashboardCard from '../../components/shared/DashboardCard';
  import axios from 'axios';
const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios
      .get('http://localhost:5278/admins/allFeedbacks')
      .then((response) => setFeedbacks(response.data))
      .catch((error) => console.error('Error fetching mechanics review:', error));
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

  const sortedFeedback = [...feedbacks].sort((a, b) => a.feedbackID - b.feedbackID);
  const slicedData = sortedFeedback.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <PageContainer title="Feedback by users" description="Feedback by users">
      <DashboardCard title="Feedback by users" marginTop="80px">



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
                    User Name
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
                    Feedback
                  </Typography>
                </TableCell>
    
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedData.map((feedbacks) => (
                <TableRow key={feedbacks.feedbackID}>
                  <TableCell align="center">
                    <Typography variant="subtitle2" fontWeight={600}>
                      {feedbacks.userName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{feedbacks.userEmail}</Typography>
                  </TableCell>
                  <TableCell color="textSecondary" variant="subtitle2" fontWeight={400} align="center">
                  <Rating name="half-rating-read" defaultValue={feedbacks.rating} precision={0.5} readOnly />
                  </TableCell>
                  <TableCell align="center">
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {feedbacks.feedbackText}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={feedbacks.length}
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

export default Feedback;
