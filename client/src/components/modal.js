// modal.js
import React, { useState } from 'react';
import {
  Modal,
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextareaAutosize,
  
} from '@mui/material';
import FullScreenDialog from './fullScreenDialog';
const CustomModal = () => {
  return (
    <Grid item xs={6}>
      <FormControl fullWidth>
        
          <FullScreenDialog />
      </FormControl>
    </Grid>
  )
}

export default CustomModal;