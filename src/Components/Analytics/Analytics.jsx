import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Cards from "../Cards/Cards"
import Charts from "../Charts/Charts";
import firebase from '../../firebase';
import { useAuth } from '../contexts/AuthContext';

const db = firebase.database().ref();

export default function Analytics() {
    const { currentUser } = useAuth();
    var currentUserData = [{}]
    // Initial data
    const [data, setData] = useState({
        "loan": "",
        "fund": "",
        "Draw": "",
    });
    const [ready, setReady] = useState(false);

    // Fetching data
    useEffect(() => {
        fetchData().then(
            setReady(true)
        );
    }, [])

    const fetchData = async () => {
        // For loan
        var l=0;
        var f=0;
        var d=0;
        
        db.child('loan').on('value', snapshot => {
            var key = Object.entries(snapshot.val());
            
            search(key)            
            if (snapshot.val() != null) {
                l = currentUserData.length
            }
        })

        //For Fund Raise
        db.child('fund-raise').on('value', snapshot => {
            var key = Object.entries(snapshot.val());
            
            search(key)
            if (snapshot.val() != null) {
                f = currentUserData.length
            }
        })
        // For Draw
        db.child('draw').on('value', snapshot => {
            var key = Object.entries(snapshot.val());
            
            search(key)
            if (snapshot.val() != null) {
                d = currentUserData.length
            }
        })
        //Setting data
        setData({ "loan": l, "fund": f, "Draw": d });
}

    function search(data) {
        currentUserData = [{}]
        for(var key=0; key < data.length; key++ ){
            if(data[key][1].email == currentUser.email){
                currentUserData.push(data[key]);
            }
        }
        currentUserData.reverse().pop();
    }

    if(!ready){
        return <h2>Loading...</h2>
    }

    return (
        <div>
            <NavBar />
            <div>
                <Cards data={data} />
                <Charts className="ml-4" data={data} />
            </div>
        </div>
    )
}
