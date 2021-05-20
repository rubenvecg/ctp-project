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
        const marginTop = height * 0.05;
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
            

      
            
        const toolTip = d3.select(`#${id}`).append('p')        

        svg.append('g').attr("transform", `translate(0, ${height - marginBottom})`).call(d3.axisBottom(xAxis))
        .selectAll('text').text((d, i) => "'" + d.toString().substring(2))
        svg.append('g').attr("transform", `translate(${marginLeft}, 0)`).call(d3.axisLeft(yAxis))
    }
}