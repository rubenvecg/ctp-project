const d3 = require('d3');

const Figure = (props) => {

    const width = props.width
    const height = props.height

    const svg = d3.select(`#${props.id}`)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)

    return svg    
}

export default Figure;