import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Button from "@mui/material/Button";
import Details from "./Details";
import List from "./List";
import Hourly from "./Hourly";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const useStyles = makeStyles((theme) => ({
  topNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
  cityText: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  mainTemp: {
    marginTop: "9rem",
    padding: "2rem 0",
  },
  button: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)",
    "&:visited": {
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
  tempToday: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
  },
  hr: {
    border: 0,
    backgroundColor: theme.palette.hr.background,
    height: "2px",
    margin: "1rem 0",
  },
  grid: {
    marginBottom: "100px",
    display: "grid",
    gridTemplateColumns: "100%",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr",
      gridColumnGap: "5%",
    },
    alignItems: "start",
  },
  gridItem: {
    padding: "2rem 0",
    margin: "2rem 0",
    height: "100%",
  },
  topPage: {
    padding: "2rem 0",
    marginBottom: "2rem",
    [theme.breakpoints.up("md")]: {
      margin: "2rem 0",
    },
  },
  marginItems: {
    margin: "2rem",
  },
  desktopSearch: {
    marginTop: "9rem",
    alignSelf: "center",
  },
  hourly: {
    [theme.breakpoints.up("md")]: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      bottom: 90,
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function WeatherLayout(props) {
  const classes = useStyles();
  const handleClick = () => {
    props.handleNavClick("favorites");
  };
  const handleLocationClick = () => {
    props.weatherLoc(props.getWeatherByLoc);
    console.log("asdf");
  };
  return (
    <div>
      <Container>
        <div className={classes.topNav}>
          <div className={classes.cityText} onClick={handleLocationClick}>
            <LocationOnOutlinedIcon /> &nbsp;
            <Typography variant="h6"> {props.city}</Typography>
          </div>
          <Link className={classes.button} to="/favorites">
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<FavoriteIcon />}
              onClick={handleClick}
            >
              Favorites
            </Button>
          </Link>
        </div>
      </Container>
      <Container>
        <div className={classes.grid}>
          <Container className={classes.mainTemp}>
            <div className={classes.tempToday}>
              <Typography variant="h1">{props.temp}&deg;</Typography>
              <Typography variant="h6" component="h2">
                <FontAwesomeIcon
                  icon={props.weatherIcon(props.weatherId, props.hour)}
                  className={classes.icon}
                />
                &nbsp;
                {props.weatherType}
                <br />
                <div className={classes.cityText}>
                  <ArrowUpwardIcon /> {props.tempMax}&deg;C &nbsp;
                  <ArrowDownwardIcon /> {props.tempMin}&deg;C
                </div>
              </Typography>
            </div>
          </Container>
          <div className={classes.hourly}>
            <Paper className={classes.topPage}>
              <Container>
                <Typography>Hourly</Typography>
                <hr className={classes.hr}></hr>
                <Hourly
                  tempHourly={props.tempHourly}
                  weatherIcon={props.weatherIcon}
                />
              </Container>
            </Paper>
          </div>

          <div>
            <Paper className={classes.gridItem}>
              <Container>
                <Typography>NEXT 5 DAYS</Typography>
                <hr className={classes.hr}></hr>
                <List
                  tempNextDays={props.tempNextDays}
                  weatherIcon={props.weatherIcon}
                />
              </Container>
            </Paper>
          </div>

          <div>
            <Paper className={classes.gridItem}>
              <Container>
                <Typography>DETAILS</Typography>
                <hr className={classes.hr}></hr>
                <Details details={props.details} />
              </Container>
            </Paper>
          </div>
        </div>
      </Container>
      <Snackbar
        open={props.error}
        autoHideDuration={3000}
        onClose={props.handleErrorClose}
        className={classes.snackbar}
      >
        <Alert onClose={props.handleErrorClose} severity="error">
          Wrong town name!
        </Alert>
      </Snackbar>
    </div>
  );
}
