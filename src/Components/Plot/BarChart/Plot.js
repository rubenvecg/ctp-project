const d3 = require('d3')
const { FormFile } = require('react-bootstrap')
const styling = require('../../../HelperFunctions/Styling')

let xAxis = null
let yAxis = null

export const drawChart = ({id, size, data, xCol, yCol, selected}) => {
        d3.select(`#${id} > *`).remove()
        let [width, height] = size ? size : styling.getDimensions(id)

        const labels = data.map(d => d[xCol])
        const values = data.map(d => d[yCol])

        const fig = d3
        .select(`#${id}`)
        .append("svg")
        .attr("width", width).attr("height", height)
    
        const marginLeft = width * 0.08
        const marginRight = width * 0.08
        const marginTop = height * 0.4
        const marginBottom = 0//height * 0.05        
        const maxBarHeight = height - marginTop - marginBottom
        const max = d3.max(values)


        xAxis = d3.scaleBand()                    
                    .domain(labels) // Axis values            
                    .range([marginLeft, width - marginRight]) // Axis extent
        yAxis = d3.scaleLinear()                    
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

        // Individual bars
        fig.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", (d, i) => d[xCol] == selected ? "bar bar-selected" : "bar")
            .attr("x", (d, i) => x(d, i))
            .attr("y", (d, i) => y(0))
            .attr("width", barWidth)
            .attr("height", (d, i) => 0)
            .style("cursor", "pointer")
            .transition()
            .duration(1000)
            .attr("y", (d, i) => y(d[yCol],i))
            .attr("height", (d, i) => barHeight(d[yCol],i))
}

export const selectBar =  (id, index, valueCol) => {
    const fig = d3.select(`#${id}`).selectAll('svg')

    fig.selectAll('text').remove()
    fig.selectAll('path').remove()

    const toolTip = fig.append('text')
                        .text('test')
                        .style('font-size', '12px')
                        .style("text-anchor", "middle")  
    
    fig.selectAll('rect').attr("class", (d, i, n) => {
        if(d[index.col] == index.val){

            toolTip.text(d[index.col] + ": " + d[valueCol])                    
                    .attr("x", xAxis(d[index.col]) + xAxis.bandwidth()/2)
                    .attr("y", 10)
            fig.append('path').attr("d",
            `M${xAxis(d[index.col]) + xAxis.bandwidth()/2} 15 
            L${xAxis(d[index.col]) + xAxis.bandwidth()/2} ${yAxis(d[valueCol])}`).style("stroke", "white")
            
            return 'bar bar-selected'
        }else{                    
            return 'bar'
        }
    })      
}

export const clearSelected = (id) => {
    const fig = d3.select(`#${id}`).selectAll('svg')
    fig.selectAll('text').remove()
    fig.selectAll('path').remove()
    fig.selectAll('rect').attr("class", "bar")
}
