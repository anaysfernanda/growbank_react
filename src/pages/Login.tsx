import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import AdbIcon from "@mui/icons-material/Adb";
import { login } from "../store/modules/LoginSlice";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const Login: React.FC = () => {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginRedux = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginRedux.logged) {
      navigate("/");
    }
  }, [loginRedux, navigate]);

  const handleLogin = () => {
    if (user.length && password.length) {
      dispatch(login({ user, password, logged: true }));
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100vh", padding: "0 20px" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={6}>
        <Paper sx={{ padding: "30px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" justifyContent="center">
              <AccountBalanceIcon
                fontSize="large"
                sx={{ marginRight: "10px" }}
              />
              <Typography variant="h4">GrowBank</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                onChange={(ev) => setUser(ev.target.value)}
                label="Login"
                value={user || ""}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                onChange={(ev) => setPassword(ev.target.value)}
                label="Senha"
                value={password || ""}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item>
                  <Button onClick={handleLogin} variant="contained">
                    Logar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
