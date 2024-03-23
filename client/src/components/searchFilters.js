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
import Loader from './loader';

const SearchFilters = ({onSearch,onRangeSearch,onRegSearch}) => {
  const [selectedKeyword, setSelectedKeyword] = useState('');
  
  

  return (
    <Container sx={{width:"500px"}}>
     
      <FormControl fullWidth>
        <OutlinedInput
          id="search-bar"
          placeholder="Search by keyword"
          value={selectedKeyword}
          onChange={(event) => {
            setSelectedKeyword(event.target.value);
            onSearch(event.target.value);
          }}
          fullWidth
          
          
          style={{
            border: '1px solid #d3d3d3',
            boxShadow: 'none',
            width: '200px',
            marginLeft:'8px'
          }}
        />
        
      </FormControl>
      <SelectFilterCity onSearch={onSearch}/>
      {/* <SelectFilterProvince/> */}
      <SelectFilterMake onSearch={onSearch}/>
      <PriceRange onRangeSearch={onRangeSearch}/>
      {/* <YearRange/> */}
      <MileageRange onRangeSearch={onRangeSearch}/>
      <SelectFilterRegisteredIn onRegSearch={onRegSearch}/>
      </Container>
  );
};

export default SearchFilters;
