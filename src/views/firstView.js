import { Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DataTable from "../components/table";
import DialogBox from "../components/sampleDialog";
import FormTicket from "../components/formTicket";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { backend_path } from "../configuration/path";

export default function Tickets() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));
  const [action, setAction] = React.useState();
  const [row, setRow] = React.useState();
  const [newRow, setNewRow] = useState({
    intituleTicket: null,
    descriptionTicket: null,
    dateLimitTicket: null,
    donneesTicket: null,
    remarquesTicket: null,
    assistante: null,
    file: null,
    etatTicket: {
      idEtatTicket: 1,
      intituleEtatTicket: "Ouvert",
    },
  });
  const [rows, setRows] = React.useState();
  const [rowsTable, setRowsTable] = React.useState();

  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleClickOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = () => {
    const axiosGetTickets = async () => {
      axios
        .get(backend_path+"ticketManagement/getTickets")
        .then((response) => {
          setRows(response.data);
          setRowsTable(response.data);
        })
        .catch((err) => err);
    };
    axiosGetTickets();
  };

  const postTicket = () => {
    const axiosPostTicket = async () => {
      axios
        .post(backend_path+"ticketManagement/createTicket", newRow)
        .then((response) => {
          let newTicket = response.data;
          let ticketsList = [...rows, newTicket];
          setRows(ticketsList);
          setRowsTable(ticketsList);
          setNewRow(setUpNewRow());
        })
        .catch((err) => {
          handleClickOpenSnackBar()
        });
    };
    axiosPostTicket();
  };

  const columns = [
    { field: "idTicket", headerName: "ID ticket", width: 150 },
    { field: "intituleTicket", headerName: "Intitulé ticket", width: 150 },
    {
      field: "descriptionTicket",
      headerName: "Descritpion ticket",
      width: 250,
    },
    { field: "dateLimitTicket", headerName: "Date Limit ticket", width: 150 },
    {
      field: "action",
      headerName: "Visualiser",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          handleAction(params.row);
        };
        return (
          <IconButton onClick={onClick}>
            <VisibilityIcon></VisibilityIcon>
          </IconButton>
        );
      },
    },
    {
      field: "etatTicket",
      headerName: "Etat Ticket",
      width: 150,
      valueGetter: (params) => {
        return params.row.etatTicket.intituleEtatTicket;
      },
    },
  ];

  const setUpNewRow = () => {
    return {
      intituleTicket: null,
      descriptionTicket: null,
      dateLimitTicket: null,
      donneesTicket: null,
      remarquesTicket: null,
      assistante: null,
      etatTicket: {
        idEtatTicket: 1,
        intituleEtatTicket: "Ouvert",
      },
    };
  };
  
  
  const handleChange = (target) => {
    setNewRow((prevState) => ({
      ...prevState,
      [target.id]: target.value,
    }));
  };
  const handleDateChange = (newValue) => {
    setValue(newValue);
    setNewRow((prevState) => ({
      ...prevState,
      dateLimitTicket: newValue,
    }));
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = (row) => {
    setAction("visualize");
    handleClickOpen();
    setRow(row);
  };

  const handleTicketState = (e) => {
    let tickets = null;
    if (e.target.id != 4) {
      tickets = rows.filter(
        (row) => row.etatTicket.idEtatTicket == e.target.id
      );
      setRowsTable(tickets);
    } else {
      tickets = rows;
      setRowsTable(tickets);
      console.log(rows);
    }
  };
  const handleSubmit = () => {
    postTicket();
    setOpen(false);
  };
  const handleFileDownLoad = (path) => {
    const axiosGetFile = async () => {
      axios
        .get("http://127.0.0.1:8000" + path)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => err);
    };
    axiosGetFile();
  }
  const actionSnackBar = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="h5">Liste des tickets</Typography>
        </Grid>
        <Grid item xs={5} spacing={5}>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button id={1} color="primary" onClick={handleTicketState}>
              Ouverts
            </Button>
            <Button id={2} color="warning" onClick={handleTicketState}>
              En cours
            </Button>
            <Button id={3} color="success" onClick={handleTicketState}>
              Clôturés
            </Button>
            <Button id={4} style={{backgroundColor : '#616161'}} onClick={handleTicketState}>
              Tous
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={3} justifyContent="flex-end">
          <Button
            variant="contained"
            onClick={() => {
              handleClickOpen();
              setAction("add");
            }}
          >
            Ajouter un ticket
          </Button>
        </Grid>
      </Grid>
      <DataTable rows={rowsTable ? rowsTable : []} columns={columns} />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Vous n'avez pas rempli tous les champs"
        action={actionSnackBar}
      />
      <DialogBox
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title={
          action == "add"
            ? "Créer un nouveau ticket"
            : "Visualiser les informations du ticket"
        }
        children={
          action == "add" ? (
            <FormTicket
              value={value}
              handleChange={handleChange}
              newRow={newRow}
              handleDateChange={handleDateChange}
            />
          ) : (
            <FormTicket
              value={value}
              handleChange={handleChange}
              row={row}
              handleFileDownLoad={handleFileDownLoad}
            />
          )
        }
        savable={action == "add" ? true : false}
      ></DialogBox>
    </>
  );
}
