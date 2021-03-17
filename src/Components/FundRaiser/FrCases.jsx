import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Cases from "../Cases/Cases";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0)
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing(2)
  },
  subheader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto"
  }
}));

const FrCases = () => {
  const classes = useStyles();

  return (
    <>
      <Typography className={classes.text} variant="h5" gutterBottom>
        Fund Raiser Cases
      </Typography>
      <div className="row">
        <Cases />
        <Cases />
        <Cases />
      </div>
    </>
  );
};
export default FrCases;
