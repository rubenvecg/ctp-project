import {React, useState, useEffect} from 'react'
import * as d3 from 'd3'
import styled from "styled-components"
import {BarChart, GeoJSONMap} from "../../Components/Plot/React"
import BoundarySelector from './BoundarySelector'
import RaceChart from './RaceChart'
import {getColName, cleanName} from '../../HelperFunctions/Indexing'
import AgeSexChart from './AgeSexChart'

let width = 600
let height = 500

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: ${height + 100}px;


    & .viz{
        display: grid;
        grid-template-rows: 120px 1fr 1fr;
        height: ${height + 100}px;
    }

    #demographics{
        display: grid;
        grid-template-columns: 50% 50%;
    }
`
const Dashboard = () => {
    const [boundary, setBoundary] = useState("schoolDistricts") 
    const [index, setIndex] = useState(null) 
    const [count, setCount] = useState(null)
    const [test, setTest] = useState(new Date())

    const handleBoundaryClick = (index, count) => {
        setIndex(index)
        setCount(count)
    }

    const mapProps = {
        width: width,
        height: height,
        toolTipCols:{
            name: cleanName(boundary),
            valueCol: boundary == "boroughs" ? getColName(boundary).name : getColName(boundary),
            value: "CrimeCount"
        }
    }
    
    return (
    <Grid>       
        <GeoJSONMap boundary={boundary} id="map" props={mapProps}
            onBoundaryClick={(i, v) => {handleBoundaryClick(i, v)}}>

                <BoundarySelector value={boundary} 
                onChange={(b) => {
                    setBoundary(b)
                    setIndex(null)
                    setCount(null)
                }}/>
        </GeoJSONMap>

        <div className="viz">
            <div className="summary">                
                <div>
                    <p>2020</p>
                    <p>{cleanName(boundary)}{boundary !== "boroughs" ? " #" : ""}: {index}</p>
                    <p>Crime Count: {count}</p>
                </div>                
            </div>

            <div id="crime-list">
            </div> 

            <div id="demographics">
                <div>
                    <AgeSexChart by={boundary} index={index} props={{width: 341, height: 240}} id="age-sex"></AgeSexChart>
                </div>
                <div>
                    <RaceChart by={boundary} index={index} props={{width: 341, height: 240}} id="race"></RaceChart> 
                </div>
            </div> 
        </div>
        
    </Grid>)
    
}
 
export default Dashboard;