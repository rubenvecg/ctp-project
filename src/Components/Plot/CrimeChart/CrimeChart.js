import React, { useState, useEffect } from 'react'
import * as d3 from 'd3'
import {getDimensions} from '../../../HelperFunctions/Styling'
import {getColName, getBoroName, getFileLink} from '../../../HelperFunctions/Indexing'
import * as Plot from './Plot'

const gridStyle = {
    display: 'grid',
    gridTemplateRows : '50px 1fr',
    height: '100%'
}

const CrimeChart = ({year, by, index, props, id}) => {

    const colName = (by == "boroughs") ? getColName(by).code : getColName(by)
    const [top, setTop] = useState(5)
    const [selected, setSelected] = useState(null)

    useEffect(() => {        
        if(!by || !index) return
        
        let data = []

        d3.csv(getFileLink(year, by, 'offenses'), (r) => {
            if(r[colName] == index || getBoroName(r[colName]) == index){
                data.push({
                    value: parseInt(r['CrimeCount']),
                    label: r['OfnsDesc']
                })              
            }

            data.sort((a, b) => b.value - a.value)
        })        
        .then(()=> {
            Plot.drawChart({id, data, xCol: "label", yCol: "value", top: top}, (s) => {
                setSelected(s)
            })        
        })
        .catch((error) => {
            console.log(error)
        })
    }, [year, by, index, top])  

    return (<div style={gridStyle}>
                <div style={{position: 'relative'}}>
                    <select value={top} onChange={(e) => setTop(e.target.value)}>
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

