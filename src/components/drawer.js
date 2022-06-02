import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import BasicTable from "./table";
import DataTable from "./table";
import Tickets from "../views/firstView";
import { Route, withRouter, Switch, Link, NavLink } from "react-router-dom";
import { createStyles } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import TicketsAdmin from "../views/secondView";

const useStyles = makeStyles((theme) =>
  createStyles({
    appMenu: {
      width: "100%",
      overflow: "hidden",
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
      "&.active": {
        background: "rgba(0, 0, 0, 0.08)",
        "& .MuiListItemIcon-root": {
          color: "#fff",
        },
      },
    },
    menuItemIcon: {
      color: "#97c05c",
    },
  })
);
const drawerWidth = 240;

export default function ClippedDrawer() {
  const classes = useStyles();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Ticketing System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[
              { view: "Assistante FR", path: "firstView" },
              { view: "Assistante DZ", path: "secondView" },
            ].map((text, index) => (
              <ListItem
                button
                key={text.view}
                disablePadding
                component={Link}
                to={text.path}
                className={classes.menuItem}
                classes={{ root: classes.menuItem }}
              >
                <ListItemButton>
                  <ListItemText primary={text.view} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />

        <Switch>
          <Route exact path="/" component={withRouter(Tickets)} />
          <Route exact path="/firstView" component={withRouter(Tickets)} />
          <Route
            exact
            path="/secondView"
            component={withRouter(TicketsAdmin)}
          />
        </Switch>
      </Box>
    </Box>
  );
}
