import React from 'react'
import * as d3 from 'd3'
import {useEffect} from 'react'
import {getDimensions} from '../../../HelperFunctions/Styling'
import * as Plot from './Plot'

const BarChart = ({
    id,
    size,
    data,
    labels,
    }) => {

    useEffect(() => {
        if(!data) return
            Plot.drawChart({id, size, data, labels})   
    }, [data])
    
    return <div id={id}></div>
}

export default BarChart;

