import * as d3 from 'd3'
import {useEffect} from 'react'
import {getColName, getGeoJSONLink} from '../../../HelperFunctions/Indexing'
import * as Plot from './Plot'

const AreaChart = ({id, by, index}) => {

    useEffect(() => {
        if(!by || !index) return

        const colName = (by == "boroughs") ? getColName(by).name : getColName(by)
    
        d3.json(getGeoJSONLink(by))
        .then((g) => {
            const feature = g.features.filter(f => f.properties[colName] == index)[0]
            
            let data = []

            for (let y=2006; y<=2020; y++){
                data.push({
                    'year': y,
                    'count' : parseInt(feature.properties['CrimeCount_' + y])
                })
            }

            console.log(data)
            Plot.drawChart({id, data, xCol: 'year', yCol: 'count'})
        })

        
    }, [by, index])

    return <div id={id}></div>;
}
 
export default AreaChart;