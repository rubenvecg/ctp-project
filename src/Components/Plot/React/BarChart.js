import { useEffect, useState } from 'react';
import {Figure, Bar} from '../D3';
import { load } from '../../../Data/d3-processing'
import "../../../Styles/BarChartStyles.scss"
import * as d3 from "d3"
import arraySort from "array-sort"

const BarChart = ({
    id,
    props}) => {

    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState(null)
    const [labels, setLabels] = useState(null)

    const retrieveData = async () => {
        let data = await load("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", "name", "pop")
        data = data.slice(0, 20)
        setData(data.map(d => d.pop))
        setLabels(data.map(d => d.name))
        setIsLoaded(true)
    }

    useEffect(() => {
        retrieveData()
    }, [])
     

    const missingId = (id == null);

    if(missingId){
        return(
            <div>You must provide an id</div>
        )
    }else{
        if(!isLoaded){
            return <div>Loading</div>
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
}

export default BarChart;

