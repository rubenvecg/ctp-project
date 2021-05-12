import {useEffect, useState} from 'react'
import styled from 'styled-components'
import * as Plot from "../Components/Plot/React"
import * as d3 from "d3"

const histProps = {
    width: 500,
    height: 300,        
    marginLeft: 25,
    marginRight: 10,
    backgroundColor: "#222",
    barColor: "#aaa",  
    textColor: "#aaa",  
    title: "Test Histogram"
}

const LoadingContainer = styled.div`
    width: ${histProps.width}px;
    height: ${histProps.height}px;
    background: #222;
    fill: #aaa;
    margin: 0 auto;
`

const Container = styled.div`
    width: ${histProps.width}px;
    height: ${histProps.height}px;
    margin: 0 auto;
    background: ${histProps.backgroundColor};
    fill: ${histProps.textColor};

    .bar{
        transition: fill 0.5s;
        fill: ${histProps.barColor};
        stroke: black;
    }
    
    .bar:hover{    
        fill: darkslategray;
    }
`

const TestHist = () => {
    const [testData, setTestData] = useState(null)
    const [data, setData] = useState(null)
    const [labels, setLabels] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const genData = (count) => {
        let data = []

        for(var i=0; i<count; i++){
            data.push(Math.floor(Math.random() * 110))
        }

        return data
    }
    
    const toggleData = (length) => {
        setIsLoaded(false)
        let gData = genData(length)

        const histogram = d3.bin()
        const bins = histogram(gData)

        setTestData(gData)
        setData(bins.map(b => b.length))
        setLabels(bins.map(b => `[${b.x0},${b.x1}]`))
        setIsLoaded(true)
    }

    useEffect(() => {
        toggleData(10)
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
                <p>Testing Histogram</p>
                <p>Test Data</p>
                {
                    testData.map((d) => <p style={{display: 'inline'}}>{d} | </p>)
                }                
                <Container>
                    <Plot.Histogram
                        data={data}
                        labels={labels}           
                        id='hist1' 
                        props={histProps}>
                    </Plot.Histogram>
                </Container>  
                <select value="" onChange={(e) => toggleData(e.target.value)}>
                    <option></option>
                    <option>10</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </div>
        )          
    }
}
 
export default TestHist;