import React from "react";
import { TextField } from "@mui/material";

const TestArial = ({ title, value, setvalue }) => {
  return (
    <TextField
      autoFocus
      margin="dense"
      id="name"
      label={title}
      type="text"
      value={value}
      onChange={(e) => setvalue(e.target.value)}
      fullWidth
      multiline
      rows={4}
    />
  );
};

export default TestArial;
