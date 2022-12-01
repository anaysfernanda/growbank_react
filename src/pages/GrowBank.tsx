import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import {
  deleteT,
  deposito2,
  pix2,
  saque2,
} from "../store/modules/CarteiraSlice";
import DeleteIcon from "@mui/icons-material/Delete";

type Actions = "pix" | "saque" | "deposito" | "";

const GrowBank: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactionsRedux = useAppSelector(
    (state) => state.carteira2.transactions
  );
  const saldoRedux = useAppSelector((state) => state.carteira2.saldo);
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
    dispatch(saque2(changeWithdraw));
    setWithdraw("");
  };

  const handleDeposit = () => {
    let changeDeposit = Number(deposit);
    dispatch(deposito2(changeDeposit));
    setDeposit("");
  };

  const handlePix = () => {
    let changeDeposit = Number(pix);
    dispatch(
      pix2({
        id: 0,
        valor: changeDeposit,
        data: "",
        destinatario: destination,
        type: "Pix",
      })
    );
    setPix("");
    setDestination("");
  };

  const handleDelete = () => {
    dispatch(
      deleteT({
        id: 0,
        valor: 0,
        data: "",
        destinatario: "",
        type: "",
      })
    );
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
        <Grid item xs={5}>
          <Paper sx={{ padding: "30px" }}>
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: "30px" }}
            >
              Saldo atual:{" "}
              {saldoRedux.toLocaleString("pt-BR", {
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
                  <Button variant="contained" onClick={handlePix}>
                    Enviar
                  </Button>
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

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Transaçâo</TableCell>
                    <TableCell align="right">ID</TableCell>
                    <TableCell align="right">Data</TableCell>
                    <TableCell align="right">Valor</TableCell>
                    <TableCell align="right">Destinatário</TableCell>
                    <TableCell align="right">Ação</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactionsRedux.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.type}
                      </TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.data}</TableCell>
                      <TableCell align="right">R$ {row.valor}</TableCell>
                      <TableCell align="right">{row.destinatario}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleDelete()}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default GrowBank;
