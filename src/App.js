import { ThemeProvider } from "styled-components";
import { customTheme } from "./utility/theme";
import Dialog from "./components/Dialog";
import { Button, Box, Typography } from "@mui/material";
import React from "react";

const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ marginLeft: "10rem", marginTop: "1rem" }}>
        <Typography>click on share to view NotionShare</Typography>
        <Button size="small" variant="contained" onClick={handleClick}>
          Share
        </Button>
      </Box>

      <Dialog open={open} anchorEl={anchorEl} handleClose={handleClose} />
    </ThemeProvider>
  );
};

export default App;
