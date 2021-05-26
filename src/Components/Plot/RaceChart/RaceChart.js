import {React, useEffect} from 'react'
import {drawChart} from "./Plot"

const RaceChart = ({id, data, x, y}) => {
    
    useEffect(() => {        
       drawChart({id, data, x, y})      
    }, [data])

    return <div id={id}></div>
}
 
export default RaceChart;