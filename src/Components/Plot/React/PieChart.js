import { useEffect } from 'react';
import {Figure, Pie} from '../D3';

function PieChart(props){
    
    useEffect(() => {
        const fig = Figure({
            'id': props.id,
            'width': props.width,
            'height': props.height
        })

        const pie = Pie(fig, { 
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
            <div className='pie chart' id={props.id}></div>
        )
    }    
}

export default PieChart;

