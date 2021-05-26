const d3 = require('d3')
const styling = require('../../../HelperFunctions/Styling')

export const drawChart = ({id, data, xCol, yCol, top}, onSelect) => {
 
    const values = data.map(d => d[yCol]).slice(0, top)
    const labels = data.map(d => d[xCol]).slice(0, top)
    
    d3.select(`#${id} > svg`).remove()

    let [width, height] = styling.getDimensions(id)

    const fig = d3
    .select(`#${id}`)
    .append("svg")
    .attr("width", width).attr("height", height)

    const fontSize = width/height * 7

    const marginLeft = 0
    const marginRight = 0
    const marginTop = height * 0.05
    const marginBottom = height * 0.05        
    const maxBarHeight = height - marginTop - marginBottom - fontSize
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
        .data(data.slice(0, top))
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => x(d.value, i))
        .attr("y", (d, i) => y(0))
        .attr("width", barWidth)
        .attr("height", (d, i) => 0)
        .style("cursor", "pointer")
        .transition()
        .duration(1000)
        .attr("y", (d, i) => y(d.value,i))
        .attr("height", (d, i) => barHeight(d.value,i)) 
        
    const toolTip = fig.append("text").attr("opacity", 0).attr("class", "crime-type-tooltip")

    fig.selectAll("rect")
    .on("mousemove", function (d, i) {
        const target = d3.select(d.target)
        fig.selectAll('rect').attr("class", "bar") //Reset classes for all bars
        target.attr("class", " bar bar-selected")  //Add selected class to target
        
        toolTip.text(i.value)                        
                .style("text-anchor", "middle")
                .style("font-size", fontSize)                   
                .attr("x", parseInt(target.attr("x")) + barWidth/2)
                .attr("y", parseInt(target.attr("y")) - 10)
                .attr("opacity", 1)
        onSelect(i.label)       
    })
    .on("mouseout", function(d, i) {
        d3.select(d.target).attr("class", " bar") 
        onSelect(null)
    })
    console.log(maxBarHeight)
}