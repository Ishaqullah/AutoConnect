// modal.js
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';

const CustomModal = ({ open, onClose, selectedCarInfo }) => {
  const [step, setStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    year: '',
    make: '',
    model: '',
    version: '',
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSelectOption = (category, option) => {
    setSelectedOptions({ ...selectedOptions, [category]: option });
    handleNextStep();
  };

  const steps = ['Select Model Year', 'Select Make', 'Select Model', 'Select Version'];

  return (
    <Modal
      open={open}
      onClose={() => {
        if (step === 4) {
          onClose(selectedOptions);
        } else {
          onClose(selectedCarInfo);
        }
      }}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          width: 600, // Adjust the width as needed
          bgcolor: 'background.paper',
          border: '2px solid #000',
          p: 2,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {step <= 4 ? (
          <div>
            <Typography variant="h6" component="h2">
              {steps[step - 1]}
            </Typography>
            <List>
              {step === 1 ? (
                [2020, 2021, 2022, 2023].map((year) => (
                  <ListItem
                    key={year}
                    button
                    onClick={() => handleSelectOption('year', year)}
                  >
                    <ListItemText primary={year} />
                  </ListItem>
                ))
              ) : step === 2 ? (
                ['Make 1', 'Make 2', 'Make 3'].map((make) => (
                  <ListItem
                    key={make}
                    button
                    onClick={() => handleSelectOption('make', make)}
                  >
                    <ListItemText primary={make} />
                  </ListItem>
                ))
              ) : step === 3 ? (
                ['Model A', 'Model B', 'Model C'].map((model) => (
                  <ListItem
                    key={model}
                    button
                    onClick={() => handleSelectOption('model', model)}
                  >
                    <ListItemText primary={model} />
                  </ListItem>
                ))
              ) : step === 4 ? (
                ['Version 1', 'Version 2', 'Version 3'].map((version) => (
                  <ListItem
                    key={version}
                    button
                    onClick={() => handleSelectOption('version', version)}
                  >
                    <ListItemText primary={version} />
                  </ListItem>
                ))
              ) : null}
            </List>
          </div>
        ) : (
          <div>
            <Typography variant="h6" component="h2">
              Selected Options
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Model Year: {selectedOptions.year}
            </Typography>
            <Typography variant="body1">
              Make: {selectedOptions.make}
            </Typography>
            <Typography variant="body1">
              Model: {selectedOptions.model}
            </Typography>
            <Typography variant="body1">
              Version: {selectedOptions.version}
            </Typography>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default CustomModal;
