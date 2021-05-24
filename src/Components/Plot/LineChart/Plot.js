const d3 = require('d3')
const styling = require('../../../HelperFunctions/Styling')

module.exports = {
    drawChart : ({id, data, xCol, yCol}) => {
        d3.select(`#${id} > svg`).remove()

        const labels = data.map(d => d[xCol])
        const values = data.map(d => d[yCol])

        const max = d3.max(values)

        const [width, height] = styling.getDimensions(id)

        const svg = d3.select(`#${id}`)
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
        
        const marginLeft = width * 0.15;
        const marginRight = width * 0.05;
        const marginTop = height * 0.15;
        const marginBottom = height * 0.10;

        const xAxis = d3.scaleBand().domain(labels).range([marginLeft, width - marginRight])
        const yAxis = d3.scaleLinear().domain([0, max]).range([height - marginBottom, marginTop])

        svg.append("path")
            .datum(data)
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x((d) => xAxis(d[xCol]) + xAxis.bandwidth()/2)
                .y((d) => yAxis(d[yCol]))
            )

        svg.selectAll('.point')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'point')
            .attr('cx', (d, i) => xAxis(d[xCol]) + xAxis.bandwidth()/2)
            .attr('cy', (d, i) => yAxis(d[yCol]))
            .attr('r', 4)
            .on("mouseover", (e, d) => {

                svg.selectAll(".tooltip-line").remove()
                svg.selectAll(".tooltip-text").remove()
                
                const toolTip = svg.append("text")
                            .style("font-size", "12px")
                            .attr("class", "tooltip-text")

                toolTip.text(d[yCol])
                        .attr("x", e.offsetX)
                        .attr("y",e.offsetY - 20)
                        .style("text-anchor", "middle")

                //Draw line below point
                svg.append('path')
                    .attr("d", `M${xAxis(d[xCol]) + xAxis.bandwidth()/2} ${yAxis(d[yCol]) + 4} 
                                L${xAxis(d[xCol]) + xAxis.bandwidth()/2} ${yAxis(0)}`)
                    .style("stroke", "white")
                    .attr("class", "tooltip-line") 
                    
                //Draw line above point
                svg.append('path')
                    .attr("d", `M${xAxis(d[xCol]) + xAxis.bandwidth()/2} ${yAxis(d[yCol]) - 4} 
                                L${xAxis(d[xCol]) + xAxis.bandwidth()/2} ${e.offsetY - 20}`)
                    .style("stroke", "white")
                    .attr("class", "tooltip-line") 
            })
            .on("mouseout", () => {
                
            })
                   
        //Add axes
        svg.append('g').attr("transform", `translate(0, ${height - marginBottom})`).call(d3.axisBottom(xAxis))
        .selectAll('text').text((d, i) => "'" + d.toString().substring(2))
        svg.append('g').attr("transform", `translate(${marginLeft}, 0)`).call(d3.axisLeft(yAxis))
    }
}