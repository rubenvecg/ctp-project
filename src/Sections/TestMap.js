import {useState, useEffect} from 'react'
import * as d3 from 'd3'
import styled from "styled-components"
import {BarChart} from "../Components/Plot/React"

let width = null
let height = 600

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    height: ${height}px;


    & .viz{
        display: grid;
        height: ${height}px;
        grid-template-rows: 120px 1fr;
    }
    
    & .viz .summary{
        background: blueviolet;        
    }

    & .viz .charts{
        background: tomato;
    }

   

`
const url = {
    boroughs: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/boroughs.geojson",
    schoolDistricts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/school_districts.geojson",
    policePrecincts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/police_precincts.geojson" 
}
const getColName = (b) => {
    if(b === "boroughs") return "BoroName"
    if(b === "schoolDistricts") return "SchoolDist"
    if(b === "policePrecincts") return "Precinct"
}
const cleanName = (b) => {
    if(b === "boroughs") return "Borough"
    if(b === "schoolDistricts") return "School District"
    if(b === "policePrecincts") return "Police Precinct"
}

const TestMap = () => {
    const [boundary, setBoundary] = useState("schoolDistricts")
    const [index, setIndex] = useState(null)
    const [count, setCount] = useState(null)
    const [barData, setBarData] = useState(null)
    const [labels, setLabels] = useState()
    const [svg, setSvg] = useState(null)

    const loadGeoJSON = ((url, attrs, toolTipCols) => {
        const projection = d3.geoMercator()
                                .center([-73.985242, 40.730610])
                                .translate([attrs.width/2, attrs.height/2 - 30])
                                .scale(62000)

        d3.json(url)
        .then((data) => {
            const crimeCount = data.features.map(d => parseInt(d.properties.CrimeCount))            
            const min = d3.min(crimeCount)
            const max = d3.max(crimeCount) 
            
            setBarData(crimeCount)  
            setLabels(data.features.map(d => d.properties[toolTipCols.valueCol]))        

            const color = d3.scaleLinear()
                            .domain([min, max])
                            .range(["white", "darkolivegreen"])

            const toolTip = d3.select("#map")
                                .append("div")
                                .attr("class", "test-tooltip")
                                .style("opacity", 0)
            
            svg.selectAll("g").remove()
            svg.append("g")                
                .selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                .attr("class", "boundary")
                .attr("d", d3.geoPath()
                            .projection(projection))
                .attr("fill", (d, i) => color(d.properties.CrimeCount))
                .on("mouseover", (e, d) => {        
                    toolTip.html(`
                        <p>${toolTipCols.name}: ${d.properties[toolTipCols.valueCol]}</p>
                        <p># Crimes: ${d.properties[toolTipCols.value]}</p>
                    `)
                    toolTip.style("top", `${e.y}px`)
                    toolTip.style("left", `${e.x + 20}px`)
                    toolTip.style("opacity", 1)
                })
                .on("mouseout", (e) => {
                    toolTip.style("opacity", 0)
                })
                .on("click", (e, d) => {
                    setIndex(d.properties[toolTipCols.valueCol])
                    setCount(d.properties[toolTipCols.value])
                })
        })
        .catch((error) => {
            console.log(error)
        })
    })

    useEffect(() => { 
        if(svg) return
        width = document.getElementById("map").offsetWidth    
        
        setSvg(
            d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("background", "#222")
        )   
    }, [])

    useEffect(() => {
        if(!svg) return

        loadGeoJSON(url[boundary], 
            {
                width: width,
                height: height
            },
            {
                name: cleanName(boundary),
                valueCol: getColName(boundary),
                value: "CrimeCount"
            })    
           
    }, [svg, boundary])


    return (
        <div>
            <Grid>
                <div className="map">
                    <div id={"map"}></div>                
                </div>

                <div className="viz">
                    <div className="summary">
                        {(boundary && index && count) &&
                        <div>
                            <p>2020</p>
                            <p>{cleanName(boundary)}{boundary !== "boroughs" ? " #" : ""}: {index}</p>
                            <p>Crime Count: {count}</p>
                        </div>
                        }
                    </div>
                    <div className="charts">
                        {(barData && labels && boundary) &&
                            <BarChart id='bar'
                            data={barData}
                            labels={labels}
                            props={{
                                width: width,
                                height: 300,
                                barColor: "red"
                                
                            }}></BarChart>
                        }  
                    </div>               
                </div>             
                
            </Grid>

            <select value={boundary} 
                        onChange={(e) => {
                            setIndex(null)
                            setBoundary(e.target.value)
                            setBarData(null)
                            setLabels(null)
                        }}>
                <option>boroughs</option>
                <option>schoolDistricts</option>
                <option>policePrecincts</option>
            </select>

        </div>
        
        )
    
}
 
export default TestMap;