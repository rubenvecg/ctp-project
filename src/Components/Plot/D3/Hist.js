import FigureContext from "./Figure/FigureContext"
import * as d3 from "d3"
import { useContext, useEffect, useState } from "react"

const Hist = ({data, labels, props}) => {

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

        const barWidth = xAxis.bandwidth()

        const titlePositionX = width/2
        const titlePositionY = marginTop/2

        const xLabelPositionX = width - marginRight
        const xLabelPositionY = height - marginBottom/4

        const yLabelPositionX = marginLeft/4
        const yLabelPositionY = yAxis(max/2)
                

        const x = (d, i) => {
            return xAxis(labels[i])
        }

        const y = (d, i) => {
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
            .attr("class", "bar")
            .attr("x", (d, i) => x(d, i))
            .attr("y", (d, i) => y(0, 0))
            .attr("width", barWidth)
            .attr("height", (d, i) => 0)
            .style("cursor", "pointer")
            .transition()
            .duration(1000)
            .attr("y", (d, i) => y(d,i))
            .attr("height", (d, i) => barHeight(d,i))            

        //Attach axes to figure
        fig.append("g")  
            .attr('transform', `translate(0,${height - marginBottom})`)
            .attr("class", "xAxis")
            .call(d3.axisBottom(xAxis))
            .selectAll("text")
            .style('fill', props.textColor)

        fig.append("g")
            .attr("transform", `translate(${marginLeft}, 0)`)
            .attr("class", "yAxis")
            .call(d3.axisLeft(yAxis))
            .selectAll("text")
            .style("fill", props.textColor)

        

        //Title
        fig.append("text")
            .text(props.title)
            .attr("x", (d, i) => titlePositionX) 
            .attr("y", (d, i) => titlePositionY) 
            .attr("font-size", fontSize)          
            .attr("text-anchor", "middle")

        //X-axis label
        /*fig.append("text")
            .text(props.xLabel)
            .attr("x", (d, i) => xLabelPositionX) 
            .attr("y", (d, i) => xLabelPositionY) 
            .attr("font-size", fontSize)          
            .attr("text-anchor", "end") 

        //Y-axis label
        fig.append("text")  
            .attr("id", "yAxisTitle")                 
            .attr("x", yLabelPositionX) 
            .attr("y", yLabelPositionY) 
            .attr("font-size", fontSize) 
            .attr("text-anchor", "end")
            .attr("transform", `rotate(-90, ${yLabelPositionX}, ${yLabelPositionY})`) 
            .text(props.yLabel)*/
        
        //Add tooltip
        const toolTip = fig.append("text")
                            .attr("opacity", 0)
        
        fig.selectAll("rect")
        .on("mousemove", function (d, i) {
            toolTip.attr("opacity", 1)
                    .attr("x", d.offsetX)
                    .attr("y", d.offsetY - 10)
                    .text(i)         
        })
        .on("mouseout", function(d, i) {
            toolTip.attr("opacity", 0)
        })
        

        
    }

    useEffect(() => {
        if(!fig || !data) return

        drawChart()       

    }, [fig]) 

    return null;
}

export default Hist;