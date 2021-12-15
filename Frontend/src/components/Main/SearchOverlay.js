import React, { useRef, useEffect } from "react";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
const useStyles = makeStyles((theme) => ({
  overlay: {
    display: "grid",
    placeContent: "center",
    position: "fixed",
    padding: "2rem",
    left: "5%",
    width: "90%",
    top: "-2px",
    backgroundColor: theme.palette.navbar.background,
    borderRadius: "10px",
    transform: "translateY(-100%)",
  },
  textfield: {
    margin: "1rem 0",
    width: "100%",
  },
  button: {
    margin: "1rem 0",
    textDecoration: "none",
  },
  overlayOpen: {
    animation: `$slide 0.2s`,
    animationFillMode: "forwards",
  },
  "@keyframes slide": {
    "0%": {
      transform: "translateY(-100%)",
    },
    "100%": {
      transform: "translateY(40%)",
    },
  },
}));

export default function SearchOverlay(props) {
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

  const handleClick = () => {
    props.handleSearchOpen(false);
    props.handleNavClick(0);
  };

  return (
    <Paper
      className={`${classes.overlay} ${
        props.openSearch === false ? null : classes.overlayOpen
      }`}
      ref={props.openSearch ? wrapperRef : null}
    >
      <Container>
        <form onSubmit={props.loadWeather} autoComplete="off">
          <InputLabel for="city" style={{color: '#fff', marginBottom: '1rem'}}>Enter city name:</InputLabel>
          <TextField
            label="City"
            for="city"
            variant="outlined"
            className={classes.textfield}
            name="city"
            style={{color: '#fff', marginBottom: '2rem'}}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            size="large"
            startIcon={<SearchIcon />}
            type="submit"
            onClick={handleClick}
          >
            Search
          </Button>
        </form>
      </Container>
    </Paper>
  );
}
