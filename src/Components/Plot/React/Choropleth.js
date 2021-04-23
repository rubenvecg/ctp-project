import { useEffect } from 'react';
import {Figure, Choro} from '../D3';

function Chropleth(props){
    
    useEffect(() => {
        const fig = Figure({
            'id': props.id,
            'width': props.width,
            'height': props.height
        })

        const choro = Choro(fig, { 
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
            <div class='choropleth map' id={props.id}></div>
        )
    }    
}

export default Chropleth;

