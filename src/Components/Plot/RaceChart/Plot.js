const d3 = require("d3")
const styling = require("../../../HelperFunctions/Styling")

module.exports = {
    drawChart : ({id, data, x, y}) => {
        d3.select(`#${id} > svg`).remove()

        const labels = data.map(d => d[x])
        const values = data.map(d => d[y])

        const [width, height] = styling.getDimensions(id)

        const fig = d3
        .select(`#${id}`)
        .append("svg")
        .attr("width", width).attr("height", height)
        
        //Calculate margins
        const marginLeft = 0;
        const marginRight = width * 0.10;
        const marginTop = height * 0.02;
        const marginBottom = height * 0.02;

        const barHeight = (height - marginBottom - marginTop)/(2 * values.length) 
        const fontSize = barHeight * 0.75

        const max = d3.max(values)

        let total = 0
        values.forEach(v => total += v)

        const xAxis = d3.scaleLinear().domain([0, max]).range([marginLeft, width - marginRight])
        const yAxis = d3.scaleBand().domain(labels).range([marginTop, height - marginBottom])

        fig.selectAll("rect")
            .data(values)
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
                .text((l, i) => `${l}: ${values[i]} (${d3.format(".0%")(values[i]/total)})`)
                .attr("x", 0)
                .attr("y", (l) => yAxis(l) + barHeight*2 + fontSize/4)
                .style("font-size", fontSize)
    }
}