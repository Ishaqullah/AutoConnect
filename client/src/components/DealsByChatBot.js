import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TablePagination,
} from "@mui/material";
import React from "react";
import UserAdGrid from "./UserAdGrid";
import { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import { Typography, Divider } from "@mui/material";
import MyAppBar from "./MyAppBar";
import ChatIcon from "@mui/icons-material/Chat";
const DealsByChatBot = ({ onValueChange }) => {
  const { id } = useParams();
  const [advertises, setAdvertises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5278/advertises/myAds/${id}`
        );
        // console.log('API Response:', response.data);
        setAdvertises(response.data);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchData();
  }, [id]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedAdvertise = [...advertises].sort(
    (a, b) => a.advertiseID - b.advertiseID
  );
  const slicedData = sortedAdvertise.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <MyAppBar onValueChange={onValueChange} />

      <Grid container spacing={2} sx={{ marginBottom: "500px" }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Card>
            <CardContent>
              
              <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table
                  aria-label="simple table"
                  sx={{
                    whiteSpace: "nowrap",
                    mt: 2,
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Advertise Id
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Advertise Name
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Negotiated Price
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Buyer Email
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle2" fontWeight={600}>
                          Buyer Name
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
                    {slicedData.map((advertises) => (
                      <TableRow key={advertises.advertiseID}>
                        <TableCell align="center">
                          <Typography
                            sx={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {advertises.advertiseID}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle2" fontWeight={600}>
                            {advertises.advertiseName}
                          </Typography>
                        </TableCell>
                        
                        <TableCell align="center">
                          <Typography
                            color="primary"
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {advertises.negotiatedPrice}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography
                            color="primary"
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {advertises.buyer.userEmail}
                          </Typography>
                        </TableCell>
                        <TableCell
                          color="primary"
                          variant="subtitle2"
                          fontWeight={400}
                          align="center"
                        >
                          <Typography
                            color="primary"
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {advertises.buyer.userName}
                          </Typography>
                        </TableCell>
                        <TableCell
                          color="primary"
                          variant="subtitle2"
                          fontWeight={400}
                          align="center"
                        >
                          <Button variant="inherit" component={Link} to={id !== undefined ? `/ChatBox/User/${id}/${advertises.buyerID}` : ``}>
                          <ChatIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                </Box>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={advertises.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
             
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default DealsByChatBot;
