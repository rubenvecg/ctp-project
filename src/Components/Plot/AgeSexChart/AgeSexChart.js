import {React, useEffect} from 'react'
import {drawChart} from "./Plot"

const AgeSexChart = ({id, data, x, y, subCat, c1, c2}) => {

    useEffect(() => {
        drawChart({
            id, data, x, y, subCat, c1, c2
        })
    }, [data])

    return <div id={id}></div>
}
 
export default AgeSexChart;