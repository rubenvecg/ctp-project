import FigureContext from "./Figure/FigureContext"
import * as d3 from "d3"
import { useContext, useEffect, useState } from "react"

const Bar = ({data, labels, props}) => {

    const fig = useContext(FigureContext)

    const drawChart = () => {
        const width = fig.attr("width")
        const height = fig.attr("height")
        const barCount = data.length     

        //Set default values if properties are not provided
        const fontSize = props.fontSize ? props.fontSize : height * 0.05
        const marginLeft = props.marginLeft ? props.marginLeft : width * 0.05
        const marginRight = props.marginRight ? props.marginRight: width * 0.08
        const marginTop = props.marginTop ? props.marginTop : height * 0.15
        const marginBottom = props.marginBottom ? props.marginBottom : height * 0.15        
        const maxBarHeight = height - marginTop - marginBottom
        const max = d3.max(data)
        
        let xAxis = d3.scaleBand()                    
                    .domain(labels) // Axis values            
                    .range([marginLeft, width - marginRight]) // Axis extent
        let yAxis = d3.scaleLinear()                    
                    .domain([0, max]) // Axis values            
                    .range([height - marginBottom, height - marginBottom - maxBarHeight]) // Axis extent        

        const barWidth = xAxis.bandwidth() * 0.8

        const chartCenterX = data.length % 2 == 0 ? 
            (xAxis(labels[barCount/2 -1]) + xAxis(labels[barCount/2]))/2 + barWidth : 
            xAxis(labels[Math.floor(barCount/2)]) + barWidth

        const titlePositionX = chartCenterX
        const titlePositionY = marginTop/2

        const xLabelPositionX = width - marginRight
        const xLabelPositionY = height - marginBottom/4

        const yLabelPositionX = marginLeft
        const yLabelPositionY = yAxis(max/2)
                

        const x = (d, i) => {
            return xAxis(labels[i]) + barWidth*0.2
        }

        const y = (d) => {
            return yAxis(d)
        }

        const barHeight = (d, i) => {
            return d/max * maxBarHeight
        } 

        // Individual bars
        fig.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => x(d, i))
            .attr("y", (d, i) => y(0, 0))
            .attr("width", barWidth)
            .attr("height", (d, i) => 0)
            .attr("fill", props.barColor)
            .transition()
            .duration(1000)
            .attr("y", (d, i) => y(d,i))
            .attr("height", (d, i) => barHeight(d,i))
            
    
        // Bar annotations
        fig.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text((d) => props.showValues ? d : "")
            .attr("x", (d, i) => x(d,i) + barWidth/2) 
            .attr("y", (d, i) => y(0,0)) 
            .attr("width", 2)
            .attr("font-size", barWidth/30 * barCount)          
            .attr("text-anchor", "middle")
            .transition()
            .duration(1000)
            .attr("y", (d, i) => y(d + 2,i))
            .attr("height", (d, i) => barHeight(d,i))
        
        //Attach axes to figure
        fig.append("g")  
            .attr('transform', `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(xAxis))
            .selectAll("text")
            .attr("transform", `translate(-20, 15) rotate(-45)`) 
            .attr("text-achor", "end")
            .style('fill', props.textColor)        

        //Title
        fig.append("text")
            .text(props.title)
            .attr("x", (d, i) => titlePositionX) 
            .attr("y", (d, i) => titlePositionY) 
            .attr("font-size", fontSize)          
            .attr("text-anchor", "middle")

        //X label
        fig.append("text")
            .text(props.xLabel)
            .attr("x", (d, i) => xLabelPositionX) 
            .attr("y", (d, i) => xLabelPositionY) 
            .attr("font-size", fontSize)          
            .attr("text-anchor", "middle") 

        //Y label
        fig.append("text")                   
            .attr("x", yLabelPositionX) 
            .attr("y", yLabelPositionY) 
            .attr("font-size", fontSize) 
            .attr("text-anchor", "middle")
            .attr("transform", `rotate(-90, ${yLabelPositionX}, ${yLabelPositionY})`) 
            .text(props.yLabel)
    }

    useEffect(() => {
        if(!fig || !data) return

        drawChart()       

    }, [fig]) 

    return null;
}

export default Bar;