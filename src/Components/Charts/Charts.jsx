import React from 'react'
import { Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';

const Chart = ({data}) => {

    const barChart = (
        (
            <Bar 
            data={{
                labels: ['Loan', 'Fund Raise', 'Draw'],
                datasets: [{
                    label: 'People',
                    backgroundColor: ['rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)'],
                    data:[data.loan, data.fund, data.Draw]
                }]
            }}
            options ={
            {
                legend: {display: false},
                title: {display: true},
                scales:{
                    yAxes: [{
                        ticks:{
                            min: 0
                        }
                    }]
                }
            }
        }
            />
        )
    );

    return (
        <div className={styles.container}>
           {
               
               barChart
           }
        </div>
    )
}

export default Chart;