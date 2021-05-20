import * as d3 from "d3"
import {React, useEffect} from "react"
import "../../../Styles/MapStyle.css"
import * as Plot from './Plot'
import * as BarPlot from '../BarChart/Plot'
import {getColName, getGeoJSONLink} from '../../../HelperFunctions/Indexing'

const GeoJSONMap = ({id, year, boundary, index, onBoundaryClick, props, children, onYearChange}) => {
    const colName = (boundary == "boroughs") ? getColName(boundary).code : getColName(boundary)
    useEffect(() => {
        d3.json(getGeoJSONLink(boundary))
        .then((g) => {

            Plot.drawMap({id, g, colorProp: 'CrimeCount_' + year,
                onBoundaryOver: (d) => BarPlot.selectBar({
                    col: colName,
                    val: d.properties[colName]
                }),
                onBoundaryOut: () => BarPlot.clearSelected(),            
                onBoundaryClick: (d) => onBoundaryClick(d)
            })

            BarPlot.drawChart({id: id+'-bar', data: g.features.map(f => f.properties), xCol: colName, yCol: 'CrimeCount_' + year, values:[1,2,3], labels:['a','b','c']})
        })
        .catch((error) => {
            console.log(error)
        })

              
    }, [boundary, year])
    
    
    return( 
            
            <div>
                <div id={id}>
                    {children}                
                </div>
            </div>
            )
}
 
export default GeoJSONMap;