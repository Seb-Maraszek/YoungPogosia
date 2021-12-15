import React from "react";
import { makeStyles } from "@mui/styles";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@mui/material/Fab";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "../Main/List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    marginBottom: "80px",
  },
  button: {
    textDecoration: "none",
    color: "rgba(0, 0, 0, 0.87)",
    "&:visited": {
      color: "rgba(0, 0, 0, 0.87)",
    },
    marginLeft: '1rem'
  },
  topBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1rem 0",
  },
  addingSection: {
    display: "flex",
    width: "100%",
  },
  form: {
    flex: "1",
    display: "flex",
  },
  textField: {
    boxSizing: "border-box",
    flex: "1",
    marginLeft: "2rem",
  },
  widget: {
    margin: "1rem 0",
  },
  [theme.breakpoints.up("sm")]: {
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridGap: "2rem",
      marginTop: "2rem",
    },
  },
  fab: {
    borderRadius: "4px",
  },
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      bottom: 90,
    },
  },
  headText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hr: {
    border: 0,
    backgroundColor: theme.palette.hr.background,
    height: "2px",
    margin: "1rem 0",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FavoritesLayout(props) {
  const classes = useStyles();
  const handleClick = () => {
    props.handleNavClick(0);
  };

  return (
    <div>
      <Container className={classes.container}>
        <div className={classes.topBar}>
          <Typography variant="h6">Favorites</Typography>
          <Link to="/">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              size="large"
              startIcon={<HomeIcon />}
              onClick={handleClick}
            >
              Home
            </Button>
          </Link>
        </div>
        <div className={classes.addingSection}>
          <form
            onSubmit={props.loadWeather}
            autoComplete="off"
            className={classes.form}
          >
            <Fab
              color="primary"
              aria-label="add"
              type="submit"
              className={classes.fab}
            >
              <AddIcon />
            </Fab>
            <TextField
              className={classes.textField}
              style={{marginLeft: '1rem'}}
              label="City"
              variant="filled"
              name="city"
            />
          </form>
        </div>
        <div className={classes.grid}>
          {props.favList.map((item, id) => (
            <Card key={id} className={classes.widget}>
              <CardContent>
                <div className={classes.widgetText}>
                  <div className={classes.headText}>
                    <Typography variant="h4">{item[0].city}</Typography>
                    <IconButton
                      aria-label="delete"
                      onClick={() => props.handleDeletion(id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Typography variant="h5">
                    {item[0].temp}&deg;C &nbsp;
                    <FontAwesomeIcon
                      icon={props.weatherIcon(item[0].weatherId, item[0].hour)}
                      className={classes.icon}
                    />
                  </Typography>
                  <hr className={classes.hr}></hr>
                </div>
                <List
                  tempNextDays={item[1].favoritesTempNextDays}
                  weatherIcon={props.weatherIcon}
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <Snackbar
          open={props.error}
          autoHideDuration={3000}
          onClose={props.handleErrorClose}
          className={classes.snackbar}
        >
          <Alert onClose={props.handleErrorClose} severity="error">
            Wrong city name!
          </Alert>
        </Snackbar>
        <Snackbar
          open={props.warning}
          autoHideDuration={3000}
          onClose={props.handleErrorClose}
          className={classes.snackbar}
        >
          <Alert severity="warning">This city already exsists in a list!</Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
