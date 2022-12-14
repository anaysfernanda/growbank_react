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
import {
  addOneTransaction,
  selectAllTransactions,
} from "../store/modules/TransactionsSlice";
import { useEffect } from "react";

type Actions = "pix" | "saque" | "deposito" | "";

const GrowBank: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedAction, setSelectedAction] = useState<Actions>("");
  const [pix, setPix] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [withdraw, setWithdraw] = useState<string>("");
  const [deposit, setDeposit] = useState<string>("");
  const transactions = useAppSelector(selectAllTransactions);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

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
    const id = Math.floor(Date.now() / 1000);
    dispatch(
      addOneTransaction({
        id: id,
        type: "C",
        data: new Date().toDateString(),
        value: changeDeposit,
      })
    );
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

  const handleDelete = (id: number, type: string, valor: number) => {
    dispatch(
      deleteT({
        id: id,
        valor: valor,
        data: "",
        destinatario: "",
        type: type,
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
              <Tooltip title="Dep??sito">
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
                    label="Valor do Dep??sito"
                    variant="outlined"
                    fullWidth
                    sx={{ my: "20px" }}
                    value={deposit}
                    onChange={(ev) => setDeposit(ev.target.value)}
                  />

                  <Button variant="contained" onClick={handleDeposit}>
                    Dep??sito
                  </Button>
                </>
              ) : null}
            </Box>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Transa????o</TableCell>
                    <TableCell align="right">ID</TableCell>
                    <TableCell align="right">Data</TableCell>
                    <TableCell align="right">Valor</TableCell>
                    <TableCell align="right">Destinat??rio</TableCell>
                    <TableCell align="right">A????o</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.type}
                      </TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.data}</TableCell>
                      <TableCell align="right">R$ {row.value}</TableCell>
                      <TableCell align="right">{row.destinatario}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() =>
                            handleDelete(row.id, row.type, row.value)
                          }
                        >
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
