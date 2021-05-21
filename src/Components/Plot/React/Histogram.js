import { useEffect } from 'react';
import {Figure, Hist} from '../D3';

function Histogram({
    id,
    data,
    labels,
    props}){
        
    const missingId = (id == null);

    if(missingId){
        return(
            <div>You must provide an id</div>
        )
    }else{
        return(
            <Figure class='bar' id={id} width={props.width} height={props.height}>
                <Hist data={data} labels={labels} props={props}></Hist>
            </Figure>
        )
    }    
}

export default Histogram;

