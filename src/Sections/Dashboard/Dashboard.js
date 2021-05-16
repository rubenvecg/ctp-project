import {React, useState, useEffect} from 'react'
import styled from "styled-components"
import BoundarySelector from './BoundarySelector'
import {RaceChart, AgeSexChart, GeoJSONMap, CrimeChart} from '../../Components/Plot'
import {getColName, cleanName} from '../../HelperFunctions/Indexing'

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;


    & .viz{
        display: grid;
        grid-template-rows: 120px 1fr 250px;
        height: 100%;
    }

    #crime-info{
        display: grid;
        grid-template-columns: repeat(2, 50%);
    }

    #demographics{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
`
const Dashboard = () => {
    const [boundary, setBoundary] = useState("schoolDistricts") 
    const [index, setIndex] = useState(null) 
    const [count, setCount] = useState(null)

    const colName = boundary == "boroughs" ? getColName(boundary).name : getColName(boundary)

    const handleBoundaryClick = (d) => {
        setIndex(d[colName])
        setCount(d['CrimeCount'])
    }

    const mapProps = {
        width: 600,
        height: 500,
        toolTipCols:{
            name: cleanName(boundary),
            valueCol: colName,
            value: "CrimeCount"
        }
    }
    
    return (
    <Grid>   {    boundary &&
        <GeoJSONMap boundary={boundary} id="map"
            onBoundaryClick={(d) => {handleBoundaryClick(d)}}>

                <BoundarySelector value={boundary} 
                onChange={(b) => {
                    setBoundary(b)
                    setIndex(null)
                    setCount(null)
                }}/>
        </GeoJSONMap>}

        <div className="viz">
            <div className="summary">
                {index &&                
                <div>
                    <p>2020</p>
                    <p>{cleanName(boundary)}{boundary !== "boroughs" ? " #" : ""}: {index}</p>
                    <p>Crime Count: {count}</p>
                </div>}                
            </div>
            {index &&
            <div id='crime-info'>
                <CrimeChart by={boundary} index={index} id="crime-type"></CrimeChart>
            </div> 
            }
            <div id="demographics">
                <div>
                    {index && <AgeSexChart by={boundary} index={index} props={{width: 341, height: 240}} id="age-sex"></AgeSexChart>}
                </div>
                <div>
                    {index && <RaceChart by={boundary} index={index} props={{width: 341, height: 240}} id="race"></RaceChart> }
                </div>
            </div> 
        </div>
        
    </Grid>)
    
}
 
export default Dashboard;