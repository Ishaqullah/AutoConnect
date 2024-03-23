import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const city = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Peshawer',
  'Amirabad',
  'Faisalabad'
];

const SelectFilterCity = ({onSearch}) => {
  const [cityName, setCityName] = React.useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
      setCityName(value);
    
    onSearch(value);
  };
 const handleCheckboxChange = () =>{
  setCityName('');
  onSearch('');
 }
  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">City</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={cityName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
        >
          {city.map((name) => (
            <MenuItem key={name} value={name}  >
              <Checkbox checked={cityName === name} onChange={handleCheckboxChange}/>
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectFilterCity;
