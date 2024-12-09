import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckBoxComponent = ({ value, setvalue, title }) => {
  const handleChange = (event) => {
    setvalue(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={value} onChange={handleChange} />}
      label={title}
    />
  );
};

export default CheckBoxComponent;
