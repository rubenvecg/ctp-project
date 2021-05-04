import FigureContext from "./Figure/FigureContext"
import * as d3 from "d3"
import { useContext, useEffect, useState } from "react"

const Hist = ({props}) => {

    const fig = useContext(FigureContext)

    const drawChart = (data) => {
    /*    const width = fig.attr("width")
        const height = fig.attr("height")

        //Set default values if properties are not provided
        const fontSize = props.fontSize ? props.fontSize : height * 0.04
        const marginLeft = props.marginLeft ? props.marginLeft : width * 0.1
        const marginRight = props.marginRight ? props.marginRight: width * 0.05
        const marginTop = props.marginTop ? props.marginTop : height * 0.15
        const marginBottom = props.marginBottom ? props.marginBottom : height * 0.15        
        const maxBarHeight = height - marginTop - marginBottom
        
        const ticks = props.ticks ? props.ticks : 5
        
        let xAxis = d3.scaleBand()       
                    .range([marginLeft, width - marginRight])
        let yAxis = d3.scaleLinear()            
                    .range([height - marginBottom, height - marginBottom - maxBarHeight]) 

        const histogram = d3.bin()
        const bins = histogram(data)
        
        const max = d3.max(bins, (d) => d.length)
   

        const y = (d, i) => {
            return yAxis(d.length)
        }

        const barWidth = (d, i) => {
            return xAxis(d.x1) - xAxis(d.x0) - 0.5
        }
        
        fig.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", (d, i) => xAxis(d.x0))
            .attr("y", (d, i) => y(d, i))
            .attr("width",(d, i) => barWidth(d, i))
            .attr("height", (d, i) => d.length/max * maxBarHeight)
            .attr("fill", props.color)

        fig.append("g")
            .attr("transform", `translate(0, ${height - marginBottom})`)
            .call(d3.axisBottom(xAxis).ticks(bins.length))
        
        fig.append("g")
            .attr("transform", `translate(${marginLeft}, 0)`)
            .call(d3.axisLeft(yAxis))
        
        console.log(bins)*/

        console.log(data)
        
    }

    useEffect(() => {
        if(!fig) return

        d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", (data) => {
            drawChart(data)
        })              

    }, [fig]) 

    return null;
}

export default Hist;