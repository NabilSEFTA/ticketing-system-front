import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

import {
  DialogContent,
  DialogTitle,
  Grid,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogBox(props) {
  const { open, handleClose, savable,handleSubmit } = props;

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Grid container>
              <Grid item xs={11}>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                {savable && <Button autoFocus color="inherit" onClick={handleSubmit}>
                  Enregistrer
                </Button>}
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>{props.children}</DialogContent>
        </Container>
      </Dialog>
    </div>
  );
}
