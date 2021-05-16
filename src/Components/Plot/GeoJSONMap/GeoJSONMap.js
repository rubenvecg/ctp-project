import * as d3 from "d3"
import {React, useEffect} from "react"
import "../../../Styles/MapStyle.css"
import * as Plot from './Plot'
import * as BarPlot from '../BarChart/Plot'
import {getColName} from '../../../HelperFunctions/Indexing'

const url = {
    boroughs: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/boroughs.geojson",
    schoolDistricts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/school_districts.geojson",
    policePrecincts: "https://raw.githubusercontent.com/Maisa-ah/ctp-project/test-data/src/Data/police_precincts.geojson" 
}


const GeoJSONMap = ({id, boundary, onBoundaryClick, props, children}) => {
    const colName = (boundary == "boroughs") ? getColName(boundary).code : getColName(boundary)
    useEffect(() => {
        d3.json(url[boundary])
        .then((g) => {
            Plot.drawMap({id, g, colorProp: 'CrimeCount',
                onBoundaryOver: (d) => BarPlot.selectBar({
                    col: colName,
                    val: d.properties[colName]
                }),
                onBoundaryOut: () => BarPlot.clearSelected(),            
                onBoundaryClick: (d) => onBoundaryClick(d)
            })

            BarPlot.drawChart({id: id+'bar', data: g.features.map(f => f.properties), xCol: colName, yCol: 'CrimeCount', values:[1,2,3], labels:['a','b','c']})
        })
        .catch((error) => {
            console.log(error)
        })

              
    }, [boundary])
    
    
    return  <div className="map-container">
            
            <div>
                <div id={id}>
                    {children}                
                </div>
            </div>
            
            <div>
                <div id={id+'bar'}></div>
            </div>
            </div>
}
 
export default GeoJSONMap;