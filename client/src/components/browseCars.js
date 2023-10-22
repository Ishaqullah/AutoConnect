import React from 'react'
import Container from '@mui/material/Container';
import { Grid, requirePropFactory } from '@mui/material';
import Button from '@mui/material/Button';
import { Card, CardContent, Typography, Box,FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const categories = {
    make: ['Toyota', 'Suzuki', 'Honda','Hyundai'],
    category: ['Automatic Cars', 'Family Car', '5 Seater','4 Doors'],
    bodyType: ['SUV', 'Sedan', 'Hatchback'],
    model: ['Corolla', 'Sonata', 'Civic'],
    city: ['Karachi', 'Lahore', 'Islamabad'],
    budget: ['Under 10 lakhs', 'Under 20 lakhs', 'Under 30 lakhs'],
  };
  
const browseCars = () => {
  return (
    <Container sx={{marginBottom:'100px'}}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{color:'#9D1515'}}>
            <b>Browse For Cars</b>
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="make-select">Make</InputLabel>
                <Select
                  label="Make"
                  labelId="make-select"
                  id="make-select"
                >
                  {categories.make.map((make, index) => (
                    <MenuItem key={index} value={make}>
                      {make}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="model-select">Model</InputLabel>
                <Select
                  label="Model"
                  labelId="model-select"
                  id="model-select"
                >
                  {categories.model.map((model, index) => (
                    <MenuItem key={index} value={model}>
                      {model}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="body-type-select">Body Type</InputLabel>
                <Select
                  label="Body Type"
                  labelId="body-type-select"
                  id="body-type-select"
                >
                  {categories.bodyType.map((bodyType, index) => (
                    <MenuItem key={index} value={bodyType}>
                      {bodyType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="category-select">Category</InputLabel>
                <Select
                  label="Category"
                  labelId="category-select"
                  id="category-select"
                >
                  {categories.category.map((category, index) => (
                    <MenuItem key={index} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="city-select">City</InputLabel>
                <Select
                  label="City"
                  labelId="city-select"
                  id="city-select"
                >
                  {categories.city.map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="budget-select">Budget</InputLabel>
                <Select
                  label="Budget"
                  labelId="budget-select"
                  id="budget-select"
                >
                  {categories.budget.map((budget, index) => (
                    <MenuItem key={index} value={budget}>
                      {budget}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} justifyContent="flex-end">
              <Button variant="contained" color="secondary" >
                Search
              </Button>
            </Grid>
          </Grid>
          
          
          
        </CardContent>
      </Card>
    </Container>
  )
}

export default browseCars