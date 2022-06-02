import { IconButton } from "@mui/material";
import React, { useEffect } from "react";
import DataTable from "../components/table";
import DialogBox from "../components/sampleDialog";
import FormTicket from "../components/formTicket";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PanToolIcon from "@mui/icons-material/PanTool";
import axios from "axios";
import { backend_path } from "../configuration/path";
export default function TicketsAdmin() {
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
          handleVisualizeAction(params.row);
        };
        console.log();
        return (
          <IconButton onClick={onClick}>
            <VisibilityIcon></VisibilityIcon>
          </IconButton>
        );
      },
    },
    {
      field: "pickTicket",
      headerName: "Choisir",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          handlePickTicket(params.row);
        };
        const visible = params.row.assistante;
        return (
          <>
            {!visible && (
              <IconButton onClick={onClick}>
                <PanToolIcon></PanToolIcon>
              </IconButton>
            )}
          </>
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

  const [row, setRow] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState();
  const [rows, setRows] = React.useState();

  const handleVisualizeAction = (row) => {
    setOpen(true);
    setRow(row);
    console.log(row);
  };
  const handleChange = (target) => {
    if (target.id) {
      setRow((prevState) => ({
        ...prevState,
        [target.id]: target.value,
      }));
    } else {
      if (target.length > 0) {
        setRow((prevState) => ({
          ...prevState,
          donneesTicket: target[0].name,
          file: target[0],
        }));
        let savedRow = row;
        savedRow.donneesTicket = target[0].name;
        savedRow.file = target[0];
        let savedRows = rows.filter(
          (rowElem) => rowElem.idTicket != row.idTicket
        );
        savedRows.push(row);
        console.log(savedRows);
        setRows(savedRows);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    console.log(row);
  };

  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = () => {
    const axiosGetTickets = async () => {
      axios
        .get(backend_path + "ticketManagement/getTickets", {
          params: { view: "assistance DZ 1" },
        })
        .then((response) => {
          setRows(response.data);
        })
        .catch((err) => err);
    };
    axiosGetTickets();
  };

  const handlePickTicket = (row) => {
    var pickedRow = rows.filter((elem) => elem.idTicket == row.idTicket)[0];
    pickedRow.assistante = "assistance DZ 1";
    pickedRow.etatTicket = {
      idEtatTicket: 2,
      intituleEtatTicket: "En cours de traitement",
    };
    var formData = new FormData();
    formData.append("ticket", JSON.stringify(pickedRow));
    const axiosUpdateTicket = async () => {
      axios({
        method: "post",
        url: backend_path + "ticketManagement/updateTicket",
        data: formData,
      })
        .then((response) => {
          let tmp = rows.filter((elem) => elem.idTicket != row.idTicket);
          tmp.push(response.data);
          setRows(tmp);
        })
        .catch((err) => err);
    };
    axiosUpdateTicket();
  };

  const handleCloseTicket = () => {
    setOpen(false);
    var formData = new FormData();

    var rowTmp = row;
    rowTmp.etatTicket = {
      idEtatTicket: 3,
      intituleEtatTicket: "Clôturé",
    };

    formData.append("file", row.file);
    formData.append("ticket", JSON.stringify(rowTmp));
    console.log(row.file);
    const axiosCloseTicket = async () => {
      axios({
        method: "post",
        url: backend_path + "ticketManagement/updateTicket",
        data: formData,
      })
        .then((response) => {
          let tmp = rows.filter((elem) => elem.idTicket != row.idTicket);
          tmp.push(response.data);
          setRows(tmp);
        })
        .catch((err) => console.log(err));
    };
    axiosCloseTicket();
  };

  return (
    <>
      <DataTable rows={rows ? rows : []} columns={columns} />
      <DialogBox
        open={open}
        handleClose={handleClose}
        handleSubmit={handleCloseTicket}
        title={"Visualiser les informations du ticket"}
        children={
          <FormTicket row={row} handleChange={handleChange} view={true} />
        }
        savable={true}
      ></DialogBox>
    </>
  );
}
