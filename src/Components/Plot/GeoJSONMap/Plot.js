const d3 = require('d3')
const styling = require('../../../HelperFunctions/Styling')

module.exports = {
    drawMap : ({id, g, colorProp, onBoundaryClick, onBoundaryOver, onBoundaryOut}) => {

            const features = g.features

            d3.select(`#${id} > svg`).remove()

            const [width, height] = styling.getDimensions(id)

            const svg = d3.select(`#${id}`)
                .append("svg")
                .attr("width", width)
                .attr("height", height)

            const projection = d3.geoMercator()
                                    .center(d3.geoCentroid(g))
                                    .translate([width/2, height/2])
                                    .scale(50000)

            const properties = features.map(d => d.properties)
            
            const values = properties.map(d => parseInt(d[colorProp]))            
            const min = d3.min(values)
            const max = d3.max(values) 
            

            const color = d3.scaleLinear()
                    .domain([min, max])
                    .range(["white", "darkolivegreen"])

            const toolTip = d3.select(`#${id}`)
                        .append("div")
                        .attr("class", "map-tooltip")
                        .style("opacity", 0)

            svg.selectAll("g").remove()
            svg.append("g")                
                .selectAll("path")
                .data(features)
                .enter()
                .append("path")
                .attr("class", "boundary")
                .attr("d", d3.geoPath()
                        .projection(projection))
                .attr("fill", (d, i) => color(d.properties[colorProp]))
                .on("mouseover", (e, d) => {  
                    /*toolTip.html(`<p>Test</p>`).style("opacity", 1).style("position", "absolute")
                    .style("top", "50%").style("left", 0).style("width", "100px").style("height", "100px")*/
                    onBoundaryOver(d)
                    })
                .on("mouseout", (e) => {
                    toolTip.style("opacity", 0)
                    onBoundaryOut()
                    })
                .on("click", (e, d) => {
                    onBoundaryClick(d.properties) 
                })

    }
}