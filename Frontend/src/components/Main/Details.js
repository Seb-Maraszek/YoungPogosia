import React from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  specsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "2rem",
  },
  font: {
    fontSize: "1.1rem",
  },
});

export default function Details({ details }) {
  const classes = useStyles();
  return (
    <div className={classes.center}>
      <div className={classes.specsGrid}>
        <div>
          <Typography className={classes.font}>Humidity:</Typography>
          <Typography variant="h5" component="h3">{details[0].humidity} %</Typography>
        </div>
        <div>
          <Typography className={classes.font}>Pressure:</Typography>
          <Typography variant="h5" component="h3">{details[1].pressure} hPa</Typography>
        </div>
        <div>
          <Typography className={classes.font}>Feels like:</Typography>
          <Typography variant="h5" component="h3">{details[2].feelsLike}&deg;C</Typography>
        </div>
        <div>
          <Typography className={classes.font}>Wind degree: </Typography>
          <Typography variant="h5" component="h3">{details[3].windDeg}&deg;</Typography>
        </div>
        <div>
          <Typography className={classes.font}>Wind speed:</Typography>
          <Typography variant="h5" component="h3">{details[4].windSpeed} km/h</Typography>
        </div>
        <div>
          <Typography className={classes.font}>Visibility:</Typography>
          <Typography variant="h5" component="h3">{details[5].visibility} km</Typography>
        </div>
      </div>
    </div>
  );
}
