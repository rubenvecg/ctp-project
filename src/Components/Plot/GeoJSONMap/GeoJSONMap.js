import {React, useEffect} from "react"
import "../../../Styles/MapStyle.css"
import * as Plot from './Plot'
import * as BarPlot from '../BarChart/Plot'

const GeoJSONMap = ({id, data, onBoundaryClick, showBar, children}) => {

    useEffect(() => {
            Plot.drawMap({id, g: data.g, colorProp: data.colorCol,
                onBoundaryOver: (d) => BarPlot.selectBar({
                    col: data.indexCol,
                    val: d.properties[data.indexCol]
                }),
                onBoundaryOut: () => BarPlot.clearSelected(),            
                onBoundaryClick: (d) => onBoundaryClick(d)
            })

            if(showBar)
                BarPlot.drawChart({id: id+'-bar', data: data.g.features.map(f => f.properties), xCol: data.indexCol, yCol: data.colorCol})         
    }, [data])    
    
    return(             
        <div>
            <div id={id}>
                {children}                
            </div>
        </div>
    )
}
 
export default GeoJSONMap;