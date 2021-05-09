import FigureContext from './FigureContext'
import * as d3 from 'd3'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

const Figure = ({
    children, 
    width, 
    height, 
    id, 
    background,
    text}) => {
    
    const [fig, setFig] = useState(null)

    useEffect(() => {
        const svg = d3.select(`#${id}`)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)                   
        setFig(svg)
    }, [])

    const Container = styled.div`
        width: ${width}px;
        height: ${height}px;
    `

    //Clear figure if properties in children change
    useEffect(() => {
        if(!fig || !children) return
        
        fig.remove()
        
        const svg = d3.select(`#${id}`)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)
                    .style('background', background)
                    .style('fill', text)
                    
        setFig(svg)
        
    }, [children])

    return (                               
        <FigureContext.Provider value={fig}>
            
                <div id={id}>{children}</div>
            
        </FigureContext.Provider>           
    )   
}

export default Figure;
