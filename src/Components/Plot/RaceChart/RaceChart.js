import {React, useEffect} from 'react'
import * as Plot from "./Plot"

const RaceChart = ({id, data, x, y}) => {
    
    useEffect(() => {        
       Plot.drawChart({id, data, x, y})      
    }, [data])

    return <div id={id}></div>
}
 
export default RaceChart;