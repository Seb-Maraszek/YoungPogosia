import React, { useRef, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    display: "grid",
    placeContent: "center",
  },
  textfield: {
    margin: "1rem 0",
    width: "100%",
  },
  button: {
    margin: "1rem 0",
    textDecoration: "none",
  },
});

export default function SearchDesktop(props) {
  const classes = useStyles();
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.handleSearchOpen(false);
          props.handleNavClick(0);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div className={classes.root} ref={props.openSearch ? wrapperRef : null}>
      <Typography variant="h4"> Enter city name!</Typography>
      <form onSubmit={props.loadWeather} autoComplete="off">
        <TextField
          label="City"
          variant="filled"
          className={classes.textfield}
          name="city"
          autoFocus
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          startIcon={<SearchIcon />}
          type="submit"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
