import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState([]);
  const [currentSection, setCurrentSection] = React.useState(1);
  const [hasSelections, setHasSelections] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

    if(hasSelections) {
        setCurrentSection(selectedOptions.length + 1)
    } else{
        resetSelection();
    }
  };

  const handleClose = () => {
    setOpen(false);
    resetSelection();
  };

  const handleOptionSelect = (optionText) => {
    setSelectedOptions((prevOptions) => [...prevOptions, optionText]);

    if(!hasSelections){
        setHasSelections(true);
    }
    if (selectedOptions.length + 1 === 4) {
      // User has selected four options, close the dialog
      setOpen(false);
    } else {
      setCurrentSection((prevSection) => prevSection + 1);
    }
  };

  const resetSelection = () => {
    setSelectedOptions([]);
    setCurrentSection(1);
  };

  

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {selectedOptions.length === 4
          ? selectedOptions.join(', ')
          : 'Make/Model/Version'}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((section) => (
            <Grid item xs={3} key={section}>
              {(section <= currentSection) && (
                <Paper elevation={3} style={{ height: '100%', padding: '20px' }}>
                  <Typography variant="h6" component="div">
                    Section {section}
                  </Typography>
                  <List>
                    {['Option A', 'Option B', 'Option C', 'Option D'].map(
                      (optionText, index) => (
                        <React.Fragment key={index}>
                          <ListItem
                            button
                            onClick={() => handleOptionSelect(optionText)}
                          >
                            <ListItemText primary={optionText} />
                          </ListItem>
                          {index < 3 && <Divider />}
                        </React.Fragment>
                      )
                    )}
                  </List>
                </Paper>
              )}
            </Grid>
          ))}
        </Grid>
      </Dialog>
    </React.Fragment>
  );
};

export default FullScreenDialog;
