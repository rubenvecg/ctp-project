import React from 'react'
import * as d3 from 'd3'
import {useEffect} from 'react'

const BarChart = ({
    id,
    props,
    data,
    labels,
    }) => {

    useEffect(() => {
        if(!data) return
            const width = props.width
            const height = props.height

            d3.select(`#${id} > *`).remove()

            const fig = d3
            .select(`#${id}`)
            .append("svg")
            .attr("width", width).attr("height", height)
        
            const marginLeft = width * 0.08
            const marginRight = width * 0.08
            const marginTop = height * 0.05
            const marginBottom = height * 0.05        
            const maxBarHeight = height - marginTop - marginBottom
            const max = d3.max(data)


            let xAxis = d3.scaleBand()                    
                        .domain(labels) // Axis values            
                        .range([marginLeft, width - marginRight]) // Axis extent
            let yAxis = d3.scaleLinear()                    
                        .domain([0, max]) // Axis values            
                        .range([height - marginBottom, height - marginBottom - maxBarHeight]) // Axis extent 


            const barWidth = xAxis.bandwidth() * 0.8

            const x = (d, i) => {
                return xAxis(labels[i]) + barWidth*0.2
            }

            const y = (d, i) => {
                return yAxis(d)
            }

            const barHeight = (d, i) => {
                return d/max * maxBarHeight
            } 

            const getClass = (d, i) => {
                return "bar"
            }

            // Individual bars
            fig.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", (d, i) => x(d, i))
                .attr("y", (d, i) => y(0))
                .attr("width", barWidth)
                .attr("height", (d, i) => 0)
                .style("cursor", "pointer")
                .transition()
                .duration(1000)
                .attr("y", (d, i) => y(d,i))
                .attr("height", (d, i) => barHeight(d,i))            
            
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
            console.log(maxBarHeight)        
    }, [data])
    
    return <div id={id}></div>
}

export default BarChart;

