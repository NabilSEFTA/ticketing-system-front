import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";



export default function DataTable(props) {

  return (
    <div
      style={{
        height: window.innerHeight * 0.7,
        width: "100%",
        marginTop: "3%",
      }}
    >
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getRowId={(row)=>row.idTicket}
      />
    </div>
  );
}
