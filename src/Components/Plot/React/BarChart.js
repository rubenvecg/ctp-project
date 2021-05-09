import {Figure, Bar} from '../D3'

const BarChart = ({
    id,
    props,
    data,
    labels}) => {
    
    const missingId = (id == null);

    if(missingId){
        return(
            <div>You must provide an id</div>
        )
    }else{
        return(
            <Figure class='bar-chart' 
                id={id} 
                width={props.width} 
                height={props.height}
            >
                <Bar data={data} labels={labels} props={props}></Bar>
            </Figure>
        ) 
    }   
}

export default BarChart;

