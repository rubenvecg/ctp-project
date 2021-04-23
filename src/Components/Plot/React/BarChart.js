import { useEffect } from 'react';
import {Figure, Bar} from '../D3';

function BarChart(props){
    
    useEffect(() => {
        const fig = Figure({
            'id': props.id,
            'width': props.width,
            'height': props.height
        })

        const bar = Bar(fig, { 
            'data': props.data
        })
    }, [props.width, props.height, props.data])

    const missingId = (props.id == null);

    if(missingId){
        return(
            <div>You must provide an id</div>
        )
    }else{
        return(
            <div class='bar chart' id={props.id}></div>
        )
    }    
}

export default BarChart;

