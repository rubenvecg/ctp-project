import React from 'react'
import {useEffect} from 'react'
import {drawChart} from './Plot'

const BarChart = ({
    id,
    size,
    data,
    labels,
    }) => {

    useEffect(() => {
        if(!data) return
            drawChart({id, size, data, labels})   
    }, [data])
    
    return <div id={id}></div>
}

export default BarChart;

