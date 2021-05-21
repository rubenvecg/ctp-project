const d3 = require('d3')
const styling = require('../../../HelperFunctions/Styling')

let fig = null

module.exports = {
    drawChart: ({id, size, data, xCol, yCol}) => {
            d3.select(`#${id} > *`).remove()
            let [width, height] = size ? size : styling.getDimensions(id)

            const labels = data.map(d => d[xCol])
            const values = data.map(d => d[yCol])

            fig = d3
            .select(`#${id}`)
            .append("svg")
            .attr("width", width).attr("height", height)
        
            const marginLeft = width * 0.08
            const marginRight = width * 0.08
            const marginTop = height * 0.05
            const marginBottom = 0//height * 0.05        
            const maxBarHeight = height - marginTop - marginBottom
            const max = d3.max(values)


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
                .attr("y", (d, i) => y(d[yCol],i))
                .attr("height", (d, i) => barHeight(d[yCol],i))            
            
            //Add tooltip
            const toolTip = fig.append("text")
                                .attr("opacity", 0)
            
            fig.selectAll("rect")
            /*.on("mousemove", function (e, d) {
                toolTip.attr("opacity", 1)
                        .attr("x", e.offsetX)
                        .attr("y", e.offsetY - 10)
                        .style("font-size", 12)
                        .text(`${d[xCol]}: ${d[yCol]}`)         
            })
            .on("mouseout", function(e, d) {
                toolTip.attr("opacity", 0)
            })  */
    },

    selectBar: (index) => {
        if(!fig) return

        //toolTip.html("<p>Testing</p>")

        fig.selectAll('rect').attr("class", (d, i) => {
                if(d[index.col] == index.val)
                    return 'bar bar-selected'
                else
                    return 'bar'
            })        
    },

    clearSelected: () => {
        if(!fig) return
        fig.selectAll('rect').attr("class", "bar")
    }
}