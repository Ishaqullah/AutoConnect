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
  Chip,
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { Link, useParams } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`http://localhost:5278/mechanics/appointments/${id}`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.error('Error fetching Appointments:', error));
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

  const handleAccept = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'accepted');
  };

  const handleReject = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'rejected');
  };

  const updateAppointmentStatus = (appointmentId, stat) => {
    axios
      .put(`http://localhost:5278/mechanics/appointments/${appointmentId}`, { status: stat })
      .then((response) => {
        console.log(response);
        fetchData();
      })
      .catch((error) => console.error('Error updating record:', error));
  };

  const slicedData = appointments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <PageContainer title="List Of Users" description="this is list of users">
      <DashboardCard title="List Of Users" marginTop="80px">
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
                    Appointment Id
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Status
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Date & Time
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    User Email
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    User Phone
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
              {slicedData.map((appointment) => (
                <TableRow key={appointment.appointmentId}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                      align="center"
                    >
                      {appointment.appointmentId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600} align="center">
                      <Chip
                        label={appointment.appointmentStatus}
                        color={
                          appointment.appointmentStatus == 'pending'
                            ? 'warning'
                            : appointment.appointmentStatus == 'accepted'
                            ? 'success'
                            : 'error'
                        }
                      />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography align="center">{appointment.appointmentDate}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                      align="center"
                    >
                      {appointment.userEmail}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                      align="center"
                    >
                      {appointment.userPhone}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {appointment.appointmentStatus === 'pending' && (
                      <>
                        <Button onClick={() => handleAccept(appointment.appointmentId)}>
                          <CheckCircleIcon color="success" />
                        </Button>
                        <Button onClick={() => handleReject(appointment.appointmentId)}>
                          <CancelIcon />
                        </Button>
                      </>
                    )}
                    {appointment.appointmentStatus === 'accepted' && (
                      <Button onClick={() => handleReject(appointment.appointmentId)}>
                        <CancelIcon />
                      </Button>
                    )}
                    {appointment.appointmentStatus === 'rejected' && (
                      <Button onClick={() => handleReject(appointment.appointmentId)}>
                        <CancelIcon />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={appointments.length}
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

export default Appointment;
