import {useEffect, useState} from "react"
import * as d3 from "d3"
import styled from 'styled-components'
import * as Plot from "../Components/Plot"
    
const barProps = {
    width: 500,
    height: 300,
    backgroundColor: '#222',
    textColor: '#aaa',
    title: "Long plot title for testing x vs y",
    xLabel: "X axis",
    yLabel: "Y axis",
    marginLeft: 50
}

const LoadingContainer = styled.div`
    width: ${barProps.width}px;
    height: ${barProps.height}px;
    background: ${barProps.backgroundColor};
    margin: 0 auto;
`

const Container = styled.div`
    width: ${barProps.width}px;
    height: ${barProps.height}px;
    margin: 0 auto;
    background: ${barProps.backgroundColor};
    fill: ${barProps.textColor};

    .bar{
        transition: fill 0.5s;
        fill: darkolivegreen;
    }
    
    .bar:hover{    
        fill: darkslategray;
    }
`

const TestBar = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [data, setData] = useState(null)
    const [labels, setLabels] = useState(null)

    const retrieveData = () => {
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/barplot_change_data.csv")
        .then((data) => {
            setData(data.map(d => parseInt(d.var1)))
            setLabels(data.map(d => d.group))
            setIsLoaded(true)
        })                
    }

    useEffect(() => {
        retrieveData()
    }, [])
     

    if(!isLoaded){
        return (
            <LoadingContainer>
                Loading...
            </LoadingContainer>
        )
    }else{
        return (
            <div>
                <p>Testing Bar Chart</p>
                <Container>
                    <Plot.BarChart 
                        data={data} 
                        labels={labels}            
                        id='bar1' 
                        props={barProps}>
                    </Plot.BarChart>
                </Container>  
            </div>
        )          
    }

}
 
export default TestBar;