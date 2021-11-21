import React from "react";
import { makeStyles } from "@mui/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
  list: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    fontSize: "1.1rem",
  },
});

export default function List({ tempNextDays, weatherIcon }) {
  const classes = useStyles();
  return (
    <div className={classes.list}>
      {tempNextDays.map((item, id) => (
        <div key={id}>
          <Typography gutterBottom>{item.date}</Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            <FontAwesomeIcon icon={weatherIcon(item.weatherId, item.hour)} />
          </Typography>
          <Typography>{item.temp}&deg;C</Typography>
        </div>
      ))}
    </div>
  );
}
