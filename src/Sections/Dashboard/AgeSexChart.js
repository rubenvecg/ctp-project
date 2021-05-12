import {React, useEffect, useState} from 'react'
import * as d3 from "d3"
import {getColName, getBoroName} from '../../HelperFunctions/Indexing'

const url = {
    boroughs: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/age_by_boro.csv",
    schoolDistricts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/age_by_school_district.csv",
    policePrecincts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/age_by_police_precinct.csv"
}

const AgeSexChart = ({by, index, props, id}) => {
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
                    age: r["AgeGroup"],
                    sex: r["PerpSex"]
                }) 
                total += parseInt(r["CrimeCount"])               
            }
        })        
        .then(()=> {
            filter.sort((a, b) => b.value - a.value)

            const maleData = filter.filter(d => d.sex == "M").map(d => d.value)
            const maleLabels = filter.filter(d => d.sex == "M").map(d => d.age)            
            const femaleData = filter.filter(d => d.sex == "F").map(d => d.value)
            const femaleLabels = filter.filter(d => d.sex == "F").map(d => d.age)
            
            const width = document.getElementById(id).parentElement.clientWidth
            const height = document.getElementById(id).parentElement.clientHeight

            console.log(width)
            console.log(height)
            
            const labels = ["<18", "18-24", "25-44", "45-64", "65+"]

            const max = d3.max(filter.map(d => d.value))

            const fig = d3.select(`#${id}`)
                        .append("svg")
                        .attr("width", width).attr("height", height)
            
            //Calculate margins
            const marginLeft = width * 0.08;
            const marginRight = width * 0.08;
            const marginTop = height * 0.1;
            const marginBottom = height * 0.02;

            const barHeight = (height - marginBottom - marginTop)/10 
            const fontSize = barHeight * 0.75

            const offsetY = 0
            const centerX = width/2 - offsetY


            const xAxis1 = d3.scaleLinear().domain([0, max]).range([centerX - marginRight, marginLeft - offsetY
            ])
            const xAxis2 = d3.scaleLinear().domain([0, max]).range([centerX + marginRight, width - marginRight - offsetY
            ])
            const yAxis = d3.scaleBand().domain(labels).range([marginTop, height - marginBottom])
                   
            fig.selectAll(".bar-male")
                .data(maleData)
                .enter()
                .append("rect")
                .attr("class", "bar bar-male")
                .attr("x", (d, i) => xAxis2(d))
                .attr("y", (d, i) => yAxis(maleLabels[i]))
                .attr("width", (d, i) => 0)
                .attr("height", barHeight)
                .attr("transform", (d, i) => `translate(-${xAxis2(d) - xAxis2(0)}, 0)`)
                .transition()
                .duration(1000)
                .attr("width", (d, i) => xAxis2(d) - xAxis2(0))

            fig.selectAll(".bar-female")
                .data(femaleData)
                .enter()
                .append("rect")
                .attr("class", "bar bar-female")
                .attr("x", (d, i) => xAxis1(0))
                .attr("y", (d, i) => yAxis(femaleLabels[i]))
                .attr("width", (d, i) => 0)
                .attr("height", barHeight)
                .transition()
                .duration(1000)
                .attr("x", (d, i) => xAxis1(d))
                .attr("width", (d, i) => xAxis1(0) - xAxis1(d))

            fig.selectAll(".age-label")
                .data(labels)
                .enter()
                .append("text")
                .text((d) => d)
                .attr("class", "age-label")
                .attr("x", centerX)
                .attr("y", (d) => yAxis(d) + fontSize)
                .attr("text-anchor", "middle")

            fig.selectAll(".value-label-left")
                .data(femaleData)
                .enter()
                .append("text")
                .text((d) => `${d} (${d3.format(".0%")(d/total)})`)
                .attr("class", "value-label-left")
                .attr("x", (d) => xAxis1(0))
                .attr("y", (d, i) => yAxis(femaleLabels[i]) + 2.2 * fontSize)
                .style("font-size", fontSize * 0.8)
                .attr("text-anchor", "end")

            fig.selectAll(".value-label-right")
                .data(maleData)
                .enter()
                .append("text")
                .text((d) => `${d}: (${d3.format(".0%")(d/total)})`)
                .attr("class", "value-label-right")
                .attr("x", (d) => xAxis2(0))
                .attr("y", (d, i) => yAxis(maleLabels[i]) + 2.2 * fontSize)
                .style("font-size", fontSize * 0.8)
        })
        .catch((error) => {
            console.log(error)
        })
    }, [by, index])

    return <div id={id}></div>
}
 
export default AgeSexChart;