import * as d3 from 'd3'
import {getColName, getBoroName, getFileLink, getGeoJSONLink} from '../../HelperFunctions/Indexing'


export const LoadLineData = ({boundary, index}, _callback) => {
    d3.json(getGeoJSONLink(boundary))
        .then((g) => {
            const colName = (boundary == "boroughs") ? getColName(boundary).name : getColName(boundary)
            const feature = g.features.filter(f => f.properties[colName] == index)[0]

            let data = []
            for (let y=2006; y<=2020; y++){
                data.push({
                    'year': y,
                    'count' : parseInt(feature.properties['CrimeCount_' + y])
                })
            }
            _callback(data)
    })
}

export const LoadCrimeTypeData = ({year, boundary, index}, _callback) => {
    let data = []
    d3.csv(getFileLink(year, boundary, 'offenses'), (r) => {
        const colName = (boundary == "boroughs") ? getColName(boundary).code : getColName(boundary)
        if(r[colName] == index || getBoroName(r[colName]) == index){
            data.push({
                value: parseInt(r['CrimeCount']),
                label: r['OfnsDesc']
            })              
        }

        data.sort((a, b) => b.value - a.value)
    })        
    .then(()=> {
        _callback(data)
    })
}

export const LoadAgeSexData = ({boundary, year, index}, _callback) => {
    const colName = (boundary == "boroughs") ? getColName(boundary).code : getColName(boundary)

    let filter = []
    let total = 0

    d3.csv(getFileLink(year, boundary, 'age-sex'), (r) => {            
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
        _callback(filter)
    })
}

export const LoadRaceData = ({year, boundary, index}, _callback) => {
    const colName = (boundary == "boroughs") ? getColName(boundary).code : getColName(boundary)
    let data = []

    d3.csv(getFileLink(year, boundary, 'race'), (r) => {
        if(r[colName] == index || getBoroName(r[colName]) == index){
            data.push({
                value: parseInt(r["CrimeCount"]),
                label: r["PerpRace"]
            })              
        }
        data.sort((a, b) => b.value - a.value)
    })        
    .then(()=> {
        _callback(data)              
    })
}