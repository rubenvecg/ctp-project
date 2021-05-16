import {React, useEffect, useState} from 'react'
import * as d3 from "d3"
import {getColName, getBoroName} from "../../../HelperFunctions/Indexing"
import * as Plot from "./Plot"

const url = {
    boroughs: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/race_by_boro.csv",
    schoolDistricts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/race_by_school_district.csv",
    policePrecincts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/race_by_police_precinct.csv"
}

const RaceChart = ({by, index, props, id}) => {
    const colName = (by == "boroughs") ? getColName(by).code : getColName(by)

    useEffect(() => {        
        if(!by || !index) return
        
        let data = []

        d3.csv(url[by], (r) => {
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
    }, [by, index])

    return <div id={id}></div>
}
 
export default RaceChart;