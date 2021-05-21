import {React, useEffect} from 'react'
import * as Plot from "./Plot"

const AgeSexChart = ({id, data, x, y, subCat, c1, c2}) => {

    useEffect(() => {
        Plot.drawChart({
            id, data, x, y, subCat, c1, c2
        })
    }, data)

    return <div id={id}></div>
}
 
export default AgeSexChart;