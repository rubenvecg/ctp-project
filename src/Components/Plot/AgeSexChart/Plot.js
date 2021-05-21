const d3 = require("d3")
const styling = require("../../../HelperFunctions/Styling")

module.exports = {
    drawChart : ({id, data, x, y, subCat, c1, c2}) => {
        d3.select(`#${id} > svg`).remove()

        const data1 = data.filter(d => d[subCat] == c1).map(d => d[y])
        const labels1 = data.filter(d => d[subCat] == c1).map(d => d[x])            
        const data2 = data.filter(d => d[subCat] == c2).map(d => d[y])
        const labels2 = data.filter(d => d[subCat] == c2).map(d => d[x])

        const max = d3.max(data.map(d => d[y]))
        let total = 0
        data.forEach(d => total += d[y])

        const labels = ["<18", "18-24", "25-44", "45-64", "65+"]

        const [width, height] = styling.getDimensions(id)
        
        
        const fig = d3.select(`#${id}`)
                    .append("svg")
                    .attr("width", width).attr("height", height)

        //Calculate margins
        const marginLeft = width * 0.08;
        const marginRight = width * 0.08;
        const marginTop = height * 0.1;
        const marginBottom = height * 0.02;

        const barHeight = (height - marginBottom - marginTop)/(labels.length * 2)
        const fontSize = barHeight * 0.75

        const offsetY = 0
        const centerX = width/2 - offsetY


        const xAxis1 = d3.scaleLinear().domain([0, max]).range([centerX - marginRight, marginLeft - offsetY])
        const xAxis2 = d3.scaleLinear().domain([0, max]).range([centerX + marginRight, width - marginRight - offsetY])
        const yAxis = d3.scaleBand().domain(labels).range([marginTop, height - marginBottom])

        fig.selectAll(".bar-right")
            .data(data1)
            .enter()
            .append("rect")
            .attr("class", "bar bar-right")
            .attr("x", (d, i) => xAxis2(d))
            .attr("y", (d, i) => yAxis(labels1[i]))
            .attr("width", (d, i) => 0)
            .attr("height", barHeight)
            .attr("transform", (d, i) => `translate(-${xAxis2(d) - xAxis2(0)}, 0)`)
            .transition()
            .duration(1000)
            .attr("width", (d, i) => xAxis2(d) - xAxis2(0))

        fig.selectAll(".bar-left")
            .data(data2)
            .enter()
            .append("rect")
            .attr("class", "bar bar-left")
            .attr("x", (d, i) => xAxis1(0))
            .attr("y", (d, i) => yAxis(labels2[i]))
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
            .style("font-size", fontSize)
            .attr("text-anchor", "middle")

        fig.selectAll(".value-label-left")
            .data(data2)
            .enter()
            .append("text")
            .text((d) => `${d} (${d3.format(".0%")(d/total)})`)
            .attr("class", "value-label-left")
            .attr("x", (d) => xAxis1(0))
            .attr("y", (d, i) => yAxis(labels2[i]) + 2.2 * fontSize)
            .style("font-size", fontSize * 0.8)
            .attr("text-anchor", "end")

        fig.selectAll(".value-label-right")
            .data(data1)
            .enter()
            .append("text")
            .text((d) => `${d}: (${d3.format(".0%")(d/total)})`)
            .attr("class", "value-label-right")
            .attr("x", (d) => xAxis2(0))
            .attr("y", (d, i) => yAxis(labels1[i]) + 2.2 * fontSize)
            .style("font-size", fontSize * 0.8)
    }
}