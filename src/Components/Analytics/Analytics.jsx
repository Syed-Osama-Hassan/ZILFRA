import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import Cards from "../Cards/Cards"
import Charts from "../Charts/Charts"

export default function Analytics (){
    const feature = useState('')
    const data = {
        "loan": "10",
        "fund": "2",
        "Draw": "5"
    }
    return (
        <div>
            <NavBar />
            <Cards data={data}/>
            <Charts data={data} />
        </div>
    )
}
