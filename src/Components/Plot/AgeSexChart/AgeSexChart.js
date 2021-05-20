import {React, useEffect, useState} from 'react'
import * as d3 from "d3"
import {getColName, getBoroName, getFileLink} from '../../../HelperFunctions/Indexing'
import * as Plot from "./Plot"

const AgeSexChart = ({year, by, index, props, id}) => {
    const colName = (by == "boroughs") ? getColName(by).code : getColName(by)

    useEffect(() => {
        if(!by || !index) return

        let filter = []
        let total = 0

        d3.csv(getFileLink(year, by, 'age-sex'), (r) => {            
            if(r[colName] == index || getBoroName(r[colName]) == index){
                filter.push({
                    value: parseInt(r["CrimeCount"]),
                    age: r["AgeGroup"],
                    sex: r["PerpSex"]
                }) 
                total += parseInt(r["CrimeCount"])               
            }
        })        
        .then(()=> {
            filter.sort((a, b) => b.value - a.value)

            Plot.drawChart({
                id, data: filter, x: "age", y: "value", subCat: "sex", c1: "M", c2: "F"
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }, [year, by, index])

    return <div id={id}></div>
}
 
export default AgeSexChart;