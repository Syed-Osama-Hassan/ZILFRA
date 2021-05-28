import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Cards from "../Cards/Cards"
import Charts from "../Charts/Charts";
import firebase from '../../firebase';
import { useAuth } from '../contexts/AuthContext';

const db = firebase.database().ref();

export default function Analytics() {
    const { currentUser } = useAuth();
    // Initial data
    const [data, setData] = useState({
        "loan": "",
        "fund": "",
        "Draw": "",
    });
    const [ready, setReady] = useState(false);

    // Fetching data
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        // For loan
        var l;
        var f;
        var d;
        var key;
        var i;
        db.child('loan').on('value', snapshot => {
            key = Object.entries(snapshot.val());
            i = key[0][1].email;
            if(i == currentUser.email){
            if (snapshot.val() != null) {
                l = Object.keys(snapshot.val()).length
            }
        }
        })

        //For Fund Raise
        db.child('fund-raise').on('value', snapshot => {
            if(i == currentUser.email){
            if (snapshot.val() != null) {
                f = Object.keys(snapshot.val()).length
            }
        }
        })
        // For Draw
        db.child('draw').on('value', snapshot => {
            if(i == currentUser.email){
            if (snapshot.val() != null) {
                d = Object.keys(snapshot.val()).length
            }
        }
        })
        //Setting data
        setData({ "loan": l, "fund": f, "Draw": d });
        setReady(true);
}
    if(!ready){
        return <h2>Loading...</h2>
    }
    return (
        <div>
            <NavBar />
            <Cards data={data} />
            <Charts data={data} />
        </div>
    )
}
