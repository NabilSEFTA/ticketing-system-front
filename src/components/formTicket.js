import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { useEffect } from "react";

import { backend_path } from "../configuration/path";

export default function FormTicket(props) {
  const {
    value,
    handleChange,
    row,
    newRow,
    handleDateChange,
    view,
    handleFileOnChange,
    handleFileDownLoad,
  } = props;
  useEffect(() => {
    console.log(handleFileDownLoad);
  }, []);
  return (
    <>
      <TextField
        id="intituleTicket"
        label="Intitulé du ticket"
        variant="outlined"
        style={{ width: "100%", marginTop: "1%" }}
        disabled={row ? true : false}
        value={row ? row.intituleTicket : newRow.intituleTicket}
        defaultValue={row ? row.intituleTicket : null}
        onChange={(e) => {
          handleChange(e.target);
        }}
        required
      />
      <TextField
        id="descriptionTicket"
        label="Description détaillée"
        multiline
        rows={10}
        style={{ width: "100%", marginTop: "3%" }}
        disabled={row ? true : false}
        defaultValue={row ? row.descriptionTicket : null}
        onChange={(e) => {
          handleChange(e.target);
        }}
        required
      />
      <Grid container style={{ marginTop: "3%" }}>
        <Grid item xs={6}>
          <Typography>Date Limite (DeadLine) :</Typography>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                id="dateLimitTicket"
                label="DeadLine"
                inputFormat="dd/MM/yyyy"
                value={row ? row.dateLimitTicket : newRow.dateLimitTicket}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                disabled={row ? true : false}
                
              />
            </Stack>
          </LocalizationProvider>
        </Grid>
      </Grid>
      {row && row.assistante && (
        <TextField
          id="remarquesTicket"
          label="Remarques Assistante DZ"
          multiline
          rows={5}
          style={{ width: "100%", marginTop: "3%" }}
          disabled={!view}
          defaultValue={row.remarquesTicket}
          onChange={(e) => {
            handleChange(e.target);
          }}
        />
      )}
      {row && (
        <>
          <Grid container style={{ marginTop: "3%" }}>
            <Grid item xs={3}>
              <Typography>Pièce Jointe : </Typography>
            </Grid>
            <Grid item xs={9}>
              
                <Link  href={row.file}>
                  {row.donneesTicket}
                </Link>
              
            </Grid>
          </Grid>
        </>
      )}
      {row && row.assistante &&view && (
        <>
          <Grid container style={{ marginTop: "3%" }}>
            <Grid item xs={12}>
              <DropzoneArea
                onChange={handleChange}
                filesLimit={1}
                dropzoneText={"Ajouter une piece jointe"}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
