import React from "react";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompletedComponent = ({ array, title, placeholder }) => {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={array}
      disableCloseOnSelect
      getOptionLabel={(option) => option.key}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8, color: option.value }}
              checked={selected}
            />
            {option.key}
          </li>
        );
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label={title} placeholder={placeholder} />
      )}
    />
  );
};

export default AutocompletedComponent;
