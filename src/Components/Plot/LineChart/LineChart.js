import {useEffect} from 'react'
import {drawChart} from './Plot'

const LineChart = ({id, data, xCol, yCol}) => {

    useEffect(() => {
        if(!data) return

        drawChart({id, data, xCol, yCol})
        
    }, [data])

    return <div id={id}></div>;
}
 
export default LineChart;