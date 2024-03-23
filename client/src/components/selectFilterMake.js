import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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

const make = ["Toyota", "Honda", "Daihatsu", "Suzuki", "Kia"];

const SelectFilterMake = ({ onSearch }) => {
  // const [makeName, setMakeName] = React.useState('');

  // const handleChange = (event) => {
  //   setMakeName(event.target.value);
  // };

  // return (
  //   <div>
  //     <FormControl sx={{ m: 1, width: 200 }}>
  //       <InputLabel id="demo-multiple-checkbox-label">Make</InputLabel>
  //       <Select
  //         labelId="demo-multiple-checkbox-label"
  //         id="demo-multiple-checkbox"
  //         value={makeName}
  //         onChange={handleChange}
  //         input={<OutlinedInput label="Tag" />}
  //         renderValue={(selected) => selected}
  //         MenuProps={MenuProps}
  //       >
  //         {make.map((name) => (
  //           <MenuItem key={name} value={name}>
  //             <Checkbox checked={makeName === name} />
  //             <ListItemText primary={name} />
  //           </MenuItem>
  //         ))}
  //       </Select>
  //     </FormControl>
  //   </div>
  // );

  const [modelYear, setmodelYear] = React.useState("");
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year.toString());
  }
  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setmodelYear(value);

    onSearch(value);
  };
  const handleCheckboxChange = () => {
    setmodelYear("");
    onSearch("");
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="year-select-label">Model Year</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          renderValue={(selected) => selected}
          onChange={handleChange}
          value={modelYear}
          input={<OutlinedInput label="Tag" />}
          MenuProps={MenuProps}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              <Checkbox checked={modelYear === year}  onChange={handleCheckboxChange}/>
              <ListItemText primary={year} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectFilterMake;
