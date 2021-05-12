import {React, useEffect, useState} from 'react'
import * as d3 from "d3"
import {getColName, getBoroName} from '../../HelperFunctions/Indexing'

const url = {
    boroughs: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/race_by_boro.csv",
    schoolDistricts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/race_by_school_district.csv",
    policePrecincts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/race_by_police_precinct.csv"
}



const RaceChart = ({by, index, props, id}) => {
    const colName = (by == "boroughs") ? getColName(by).code : getColName(by)

    useEffect(() => {
        d3.select(`#${id} > svg`).remove()
        if(!by || !index) return
        console.log(by+index)

        let filter = []
        let total = 0

        d3.csv(url[by], (r) => {
            
            if(r[colName] == index || getBoroName(r[colName]) == index){
                filter.push({
                    value: parseInt(r["CrimeCount"]),
                    label: r["PerpRace"]
                }) 
                total += parseInt(r["CrimeCount"])               
            }
        })        
        .then(()=> {
            filter.sort((a, b) => b.value - a.value)
            const data = filter.map(d => d.value)
            const labels = filter.map(d => d.label)

            const fig = d3
            .select(`#${id}`)
            .append("svg")
            .attr("width", props.width).attr("height", props.height)
            
            //Calculate margins
            const marginLeft = 0;
            const marginRight = props.width * 0.10;
            const marginTop = props.height * 0.02;
            const marginBottom = props.height * 0.02;

            const barHeight = (props.height - marginBottom - marginTop)/(2 * data.length) 
            const fontSize = barHeight * 0.75

            const max = d3.max(data)

            const xAxis = d3.scaleLinear().domain([0, max]).range([marginLeft, props.width - marginRight])
            const yAxis = d3.scaleBand().domain(labels).range([marginTop, props.height - marginBottom])

            fig.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", (d, i) => 0)
                .attr("y", (d, i) => yAxis(labels[i]) + barHeight/2)
                .attr("width", (d, i) => xAxis(d))
                .attr("height", barHeight)
                .attr("transform", (d, i) => `translate(-${xAxis(d)}, 0)`)
                .transition()
                .duration(1000)
                .attr("x", (d, i) => xAxis(d))

                fig.selectAll("text")
                    .data(labels)
                    .enter()
                    .append("text")
                    .text((l, i) => `${l}: ${data[i]} (${d3.format(".0%")(data[i]/total)})`)
                    .attr("x", 0)
                    .attr("y", (l) => yAxis(l) + barHeight*2 + fontSize/4)
                    .style("font-size", fontSize)
                
        })
        .catch((error) => {
            console.log(error)
        })
    }, [by, index])

    return <div id={id}></div>
}
 
export default RaceChart;