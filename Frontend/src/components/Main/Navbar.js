import React from "react";
import { makeStyles } from "@mui/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SearchIcon from "@material-ui/icons/Search";
import Hidden from "@mui/material/Hidden";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navbar: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    zIndex: 1,
    backgroundColor: theme.palette.navbar.background + ' !important',
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Hidden mdUp>
      <BottomNavigation
        value={props.navbarValue}
        onChange={(event, newValue) => {
          if (newValue === 1) {
            props.handleSearchOpen(true);
          } else {
            props.handleSearchOpen(false);
          }
          props.handleNavClick(newValue);
          newValue === "favorites"
            ? history.push(`/${newValue}`)
            : history.push("/");
        }}
        showLabels
        className={classes.navbar}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Search" icon={<SearchIcon />}  />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}

        />
      </BottomNavigation>
    </Hidden>
  );
}
