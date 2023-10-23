import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Paper,
  Avatar
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const useStyles = makeStyles((theme) => ({
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100px',
    height: '100px',
    marginRight: theme.spacing(2),
  },
}));

const PhotoUpload = () => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = { url: e.target.result, file };
        setImages([...images, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  return (
    <Card>
      <CardContent>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="file-input"
          onChange={handleImageChange}
        />
        <label htmlFor="file-input">
          <Button variant="contained" component="span">
            Upload Image
          </Button>
        </label>
        <Grid container spacing={2}>
          {images.map((image, index) => (
            <Grid item xs={4} key={index}>
              <Paper elevation={3}>
                <div className={classes.imageContainer}>
                  <Avatar
                    alt="Uploaded Image"
                    src={image.url}
                    className={classes.imagePreview}
                  />
                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
