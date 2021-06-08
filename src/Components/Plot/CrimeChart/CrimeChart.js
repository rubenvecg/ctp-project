import React, { useState, useEffect } from 'react'
import {drawChart} from './Plot'

const gridStyle = {
    display: 'grid',
    gridTemplateRows : '50px 1fr',
    height: '100%'
}

const CrimeChart = ({data, xCol, yCol, id}) => {

    const [top, setTop] = useState(5)
    const [selected, setSelected] = useState(null)

    useEffect(() => {         
        drawChart({id, data, xCol, yCol, top: top}, (s) => {
            setSelected(s)
        }) 
    }, [data, top]) 

    return (<div style={gridStyle}>
                <div style={{position: 'relative'}}>
                    <select class='select' value={top} onChange={(e) => setTop(e.target.value)}>
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
                    </select>
                    <div id='selected-crime-type'>
                        <p style={{fontSize: 12}}>{selected ? `Offense type: ${selected}` : 'Hover on a bar to learn more'}</p>
                    </div>
                </div>
                <div><div id={id}></div></div>
            </div>)
}

export default CrimeChart;

