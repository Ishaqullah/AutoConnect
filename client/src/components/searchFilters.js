import React, { useState } from 'react';
import { FormControl, InputAdornment, OutlinedInput, IconButton, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Select } from '@mui/material';
import SelectFilterProvince from './selectFilterProvince';
import SelectFilterCity from './selectFilterCity';
import SelectFilterMake from './selectFilterMake';
import PriceRange from './priceRange';
import YearRange from './yearRange';
import MileageRange from './mileageRange';
import SelectFilterRegisteredIn from './selectFilterRegisteredIn';

const SearchFilters = () => {
  const [selectedKeyword, setSelectedKeyword] = useState('');

  const handleSearch = () => {
    // Handle the search logic here based on selectedKeyword
    console.log('Selected Keyword:', selectedKeyword);
  };

  return (
    <Container sx={{width:"500px"}}>
      <FormControl fullWidth>
        <OutlinedInput
          id="search-bar"
          placeholder="Search by keyword"
          value={selectedKeyword}
          onChange={(event) => setSelectedKeyword(event.target.value)}
          fullWidth
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleSearch} edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          style={{
            border: '1px solid #d3d3d3',
            boxShadow: 'none',
            width: '200px',
            marginLeft:'8px'
          }}
        />
      </FormControl>
      <SelectFilterCity/>
      <SelectFilterProvince/>
      <SelectFilterMake/>
      <PriceRange/>
      <YearRange/>
      <MileageRange/>
      <SelectFilterRegisteredIn/>
      </Container>
  );
};

export default SearchFilters;
