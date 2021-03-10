import React from 'react'
import styles from './Cards.module.css';
import {Card, Grid, CardContent, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    loan: {
      borderBottom: `10px solid rgba(0, 0, 250, 0.5)`,
      margin: `0 2% !important`,
    },
    fund: {
        borderBottom: `10px solid rgba(0, 250, 0, 0.5)`,
        margin: `0 2% !important`,
    },
    draw: {
        borderBottom: `10px solid rgba(250, 0, 0, 0.5)`,
        margin: `0 2% !important`,
    },
    
  });

const Cards = () => {
    const classes = useStyles();

    // if(!confirmed){
    //     return "Loading...";
    // }
    
    return (
       <div className={styles.container}>
           <Grid container spacing={3} justify="center">
               <Grid item component={Card} xs={12} md={3} className={classes.loan}>
                    <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                    Loan
                    </Typography>
                    <Typography variant="h5">
                    {/* {confirmed.value} */}
                    0
                    </Typography>
                    <Typography variant="body2">
                    Number of Loan Requests
                    
                    </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={classes.fund}>
                    <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                    Fund Raise
                    </Typography>
                    <Typography variant="h5">
                    {/* {recovered.value} */}
                    0
                    </Typography>
                    <Typography variant="body2">
                    Number of raised funds
                    
                    </Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={classes.draw}>
                    <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                    Draw
                    </Typography>
                    <Typography variant="h5">
                    {/* {deaths.value} */}
                    0
                    </Typography>
                    <Typography variant="body2">
                    Number of participation in draw                    
                    </Typography>
                    </CardContent>
                </Grid>
            </Grid>
       </div>
    )
}

export default Cards;