import { useEffect } from 'react';
import {Figure, Bar} from '../D3';

const BarChart = ({
    id,
    data, 
    labels, 
    props}) => {

    const missingId = (id == null);

    if(missingId){
        return(
            <div>You must provide an id</div>
        )
    }else{
        return(
            <Figure class='bar' 
                id={id} 
                width={props.width} 
                height={props.height} 
                background={props.backgroundColor}
                text={props.textColor}
            >
                <Bar data={data} labels={labels} props={props}></Bar>
            </Figure>
        )
    }    
}

export default BarChart;

