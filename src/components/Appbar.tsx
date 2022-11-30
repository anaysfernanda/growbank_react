import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { Grid, IconButton } from "@mui/material";
import { useLocation } from "react-router-dom";

export const Appbar: React.FC = () => {
  const pathName = useLocation().pathname;
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <img src="./images/logo-dark.png" alt="logo" />
            </Grid>
            <Grid item xs={8} textAlign="center">
              <Typography fontWeight={600} fontSize={24}>
                Bem vindo ao GrowBank
              </Typography>
            </Grid>
            {pathName === "/growbank" ? (
              <Grid item xs={2} textAlign="center">
                <IconButton>
                  <LogoutIcon sx={{ color: "white" }} />
                </IconButton>
              </Grid>
            ) : null}
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
