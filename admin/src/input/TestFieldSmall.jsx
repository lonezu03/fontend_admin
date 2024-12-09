import React from "react";
import { TextField } from "@mui/material";

const TestFieldSmall = ({ value, setvalue, title, placeholder }) => {
  return (
    <TextField
      autoFocus
      size="small"
      margin="dense"
      id="name"
      label={title}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={(e) => setvalue(e.target.value)}
      required
      variant="outlined"
      fullWidth
      InputProps={{
        style: { fontSize: "14px", padding: "10px" },
      }}
      InputLabelProps={{
        style: { fontSize: "12px", color: "gray" },
      }}
    />
  );
};

export default TestFieldSmall;
