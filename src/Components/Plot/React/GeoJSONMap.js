import * as d3 from "d3"
import {React, useState, useEffect} from "react"
import {BarChart} from "../React"
import "../../../Styles/MapStyle.css"

const url = {
    boroughs: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/boroughs.geojson",
    schoolDistricts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/school_districts.geojson",
    policePrecincts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/police_precincts.geojson" 
}


const GeoJSONMap = ({id, boundary, onBoundaryClick, props, children}) => {

    const [isLoaded, setIsLoaded] = useState(null)
    const [barData, setBarData] = useState(null) 
    const [labels, setLabels] = useState(null) 
    
    useEffect(() => {
        setIsLoaded(false)
        d3.json(url[boundary])
        .then((g) => {
            const features = g.features
            d3.select(`#${id} > svg`).remove()

            const svg = d3.select(`#${id}`)
                .append("svg")
                .attr("width", props.width)
                .attr("height", props.height)

            const projection = d3.geoMercator()
                                    .center(d3.geoCentroid(g))
                                    .translate([props.width/2, props.height/2])
                                    .scale(50000)

            const properties = features.map(d => d.properties)
            properties.sort((a, b) => b.CrimeCount - a.CrimeCount)
            const crimeCount = properties.map(d => parseInt(d.CrimeCount))           
            
            setBarData(crimeCount)
            
            const min = d3.min(crimeCount)
            const max = d3.max(crimeCount) 

            setLabels(properties.map(d => d[props.toolTipCols.valueCol]))
            

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
                .data(features)
                .enter()
                .append("path")
                .attr("class", "boundary")
                .attr("d", d3.geoPath()
                        .projection(projection))
                .attr("fill", (d, i) => color(d.properties.CrimeCount))
                .on("mouseover", (e, d) => {        
                    toolTip.html(`
                        <p>${props.toolTipCols.name}: ${d.properties[props.toolTipCols.valueCol]}</p>
                        <p># Crimes: ${d.properties[props.toolTipCols.value]}</p>
                    `)
                    toolTip.style("top", `${e.y}px`)
                    toolTip.style("left", `${e.x + 20}px`)
                    toolTip.style("opacity", 1)
                    })
                .on("mouseout", (e) => {
                    toolTip.style("opacity", 0)
                    })
                .on("click", (e, d) => {
                    onBoundaryClick(
                        d.properties[props.toolTipCols.valueCol],
                        d.properties[props.toolTipCols.value])
                    }) 

                

                
                setIsLoaded(true)
        })
        .catch((error) => {
            console.log(error)
        })

              
    }, [boundary])
    
    
    return  <div className="map-container">
            <div id={id}>
                {children}                
            </div>

            {isLoaded &&
            <BarChart props={{width: props.width, height: 100}} id="map-bar" data={barData} labels={labels}></BarChart>
            }
            </div>
    
    return null
}
 
export default GeoJSONMap;