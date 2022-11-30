import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import PixIcon from "@mui/icons-material/Pix";
import SavingsIcon from "@mui/icons-material/Savings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { useState } from "react";
import { Appbar } from "../components/Appbar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deposito, saque } from "../store/modules/CarteiraSlice";

type Actions = "pix" | "saque" | "deposito" | "";

const GrowBank: React.FC = () => {
  const dispatch = useAppDispatch();
  const saldoRedux = useAppSelector((state) => state.carteira);
  const [selectedAction, setSelectedAction] = useState<Actions>("");
  const [pix, setPix] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [withdraw, setWithdraw] = useState<string>("");
  const [deposit, setDeposit] = useState<string>("");

  const handleSelect = (action: Actions) => {
    setSelectedAction(action);
  };

  const handleWithdraw = () => {
    let changeWithdraw = Number(withdraw);
    dispatch(saque(changeWithdraw));
    setWithdraw("");
  };

  const handleDeposit = () => {
    let changeDeposit = Number(deposit);
    dispatch(deposito(changeDeposit));
    setDeposit("");
  };

  return (
    <React.Fragment>
      <Appbar />
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "86vh",
        }}
      >
        <Grid item xs={4}>
          <Paper sx={{ padding: "30px" }}>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: "30px" }}
            >
              Saldo atual:{" "}
              {saldoRedux.saldo.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Tooltip title="Pix">
                <IconButton onClick={() => handleSelect("pix")}>
                  <PixIcon sx={{ fontSize: "40px", color: "secondary.main" }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Depósito">
                <IconButton>
                  <SavingsIcon
                    onClick={() => handleSelect("deposito")}
                    sx={{ fontSize: "40px", color: "secondary.main" }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Saque">
                <IconButton>
                  <AttachMoneyIcon
                    onClick={() => handleSelect("saque")}
                    sx={{ fontSize: "40px", color: "secondary.main" }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                marginBottom: "30px",
                flexDirection: "column",
              }}
            >
              {selectedAction === "pix" ? (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Valor do Pix"
                    variant="outlined"
                    fullWidth
                    sx={{ my: "10px" }}
                    value={pix}
                    onChange={(ev) => setPix(ev.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Destino do Pix"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "20px" }}
                    value={destination}
                    onChange={(ev) => setDestination(ev.target.value)}
                  />
                  <Button variant="contained">Enviar</Button>
                </>
              ) : null}
              {selectedAction === "saque" ? (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Valor do Saque"
                    variant="outlined"
                    fullWidth
                    sx={{ my: "20px" }}
                    value={withdraw}
                    onChange={(ev) => setWithdraw(ev.target.value)}
                  />

                  <Button variant="contained" onClick={handleWithdraw}>
                    Sacar
                  </Button>
                </>
              ) : null}
              {selectedAction === "deposito" ? (
                <>
                  <TextField
                    id="outlined-basic"
                    label="Valor do Depósito"
                    variant="outlined"
                    fullWidth
                    sx={{ my: "20px" }}
                    value={deposit}
                    onChange={(ev) => setDeposit(ev.target.value)}
                  />

                  <Button variant="contained" onClick={handleDeposit}>
                    Depósito
                  </Button>
                </>
              ) : null}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default GrowBank;
