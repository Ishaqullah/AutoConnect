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

const registered = ["Sindh", "Punjab", "Islamabad", "Lahore", "Karachi",'Amirabad'];

const SelectFilterRegisteredIn = ({ onRegSearch }) => {
  const [registeredCityName, setRegisteredCityName] = React.useState("");

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setRegisteredCityName(value);

    onRegSearch(value);
  };
  const handleCheckboxChange = () => {
    setRegisteredCityName("");
    onRegSearch("");
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 200 }}>
        <InputLabel id="demo-multiple-checkbox-label">Registered</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={registeredCityName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected}
          MenuProps={MenuProps}
        >
          {registered.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox
                checked={registeredCityName === name}
                onChange={handleCheckboxChange}
              />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectFilterRegisteredIn;
