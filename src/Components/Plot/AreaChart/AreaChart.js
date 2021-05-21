import {useEffect} from 'react'
import * as Plot from './Plot'

const AreaChart = ({id, data, xCol, yCol}) => {

    useEffect(() => {
        if(!data) return

        Plot.drawChart({id, data, xCol, yCol})
        
    }, [data])

    return <div id={id}></div>;
}
 
export default AreaChart;