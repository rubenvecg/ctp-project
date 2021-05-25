const d3 = require('d3')
const styling = require('../../../HelperFunctions/Styling')

module.exports = {
    drawMap : ({id, g, indexCol, colorCol, selected, onBoundaryClick, onBoundaryOver}) => {

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
            
            const values = properties.map(d => parseInt(d[colorCol]))            
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
                .attr("class", (d, i) => d.properties[indexCol] == selected ? "boundary selected" : "boundary")
                .attr("d", d3.geoPath()
                        .projection(projection))
                .attr("fill", (d, i) => color(d.properties[colorCol]))

                .on("mouseover", (e, d) => {  
                    svg.selectAll("path").attr("class", "boundary")
                    d3.select(e.target).attr("class", "boundary selected")
                    onBoundaryOver(d)
                })
                .on("mouseout", (e) => {                    
                    svg.selectAll("path")
                        .attr("class", (d, i) => {
                            if(d.properties[indexCol] == selected){
                                onBoundaryOver(d)
                                return "boundary selected"
                            }
                            return "boundary"
                        })                    
                })
                .on("click", (e, d) => {
                    onBoundaryClick(d.properties)
                })

    }
}