import {React, useEffect, useState} from 'react'
import * as d3 from "d3"
import {getColName, getBoroName, getFileLink} from "../../../HelperFunctions/Indexing"
import * as Plot from "./Plot"

const RaceChart = ({year, by, index, props, id}) => {
    const colName = (by == "boroughs") ? getColName(by).code : getColName(by)

    useEffect(() => {        
        if(!by || !index) return
        
        let data = []

        d3.csv(getFileLink(year, by, 'race'), (r) => {
            if(r[colName] == index || getBoroName(r[colName]) == index){
                data.push({
                    value: parseInt(r["CrimeCount"]),
                    label: r["PerpRace"]
                })              
            }

            data.sort((a, b) => b.value - a.value)
        })        
        .then(()=> {
            Plot.drawChart({id, data, x: "label", y: "value"})                
        })
        .catch((error) => {
            console.log(error)
        })
    }, [year, by, index])

    return <div id={id}></div>
}
 
export default RaceChart;