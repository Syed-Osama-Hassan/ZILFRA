import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Cards from "../Cards/Cards"
import Charts from "../Charts/Charts";
import firebase from '../../firebase';

const db = firebase.database().ref();

export default function Analytics() {
    // Initial data
    const [data, setData] = useState({
        "loan": "",
        "fund": "",
        "Draw": "",
    });

    // Fetching data
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        // For loan
        var l;
        var f;
        var d;
        db.child('loan').on('value', snapshot => {
            if (snapshot.val() != null) {
                l = Object.keys(snapshot.val()).length
            }

        })

        //For Fund Raise
        db.child('fund-raise').on('value', snapshot => {
            if (snapshot.val() != null) {
                f = Object.keys(snapshot.val()).length
            }

        })
        // For Draw
        db.child('draw').on('value', snapshot => {
            if (snapshot.val() != null) {
                d = Object.keys(snapshot.val()).length
            }
        })
        //Setting data
        setData({ "loan": l, "fund": f, "Draw": d });
    }

    return (
        <div>
            <NavBar />
            <Cards data={data} />
            <Charts data={data} />
        </div>
    )
}
