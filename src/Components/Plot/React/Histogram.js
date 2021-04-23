import { useEffect } from 'react';
import {Figure, Hist} from '../D3';

function Histogram(props){
    
    useEffect(() => {
        const fig = Figure({
            'id': props.id,
            'width': props.width,
            'height': props.height
        })

        const hist = Hist(fig, { 
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
            <div class='histogram chart' id={props.id}></div>
        )
    }    
}

export default Histogram;

