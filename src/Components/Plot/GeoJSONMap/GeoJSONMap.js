import {React, useEffect} from "react"
import "../../../Styles/MapStyle.css"
import * as Plot from './Plot'
import * as BarPlot from '../BarChart/Plot'

const GeoJSONMap = ({id, data, showBar, children, index, onBoundaryClick, onBoundaryOver}) => {

    useEffect(() => {
            Plot.drawMap({
                id, 
                g: data.g, 
                indexCol: data.indexCol, 
                colorCol: data.colorCol, 
                selected: index,
                onBoundaryClick: (d) => onBoundaryClick(d),
                onBoundaryOver: (d) => BarPlot.selectBar(id+"-bar", {
                    col: data.indexCol,
                    val: d.properties[data.indexCol]
                }, data.colorCol),
                onBoundaryOver: (d) => BarPlot.selectBar(id+"-bar", {
                    col: data.indexCol,
                    val: d.properties[data.indexCol]
                }, data.colorCol)
            })

            if(showBar){
                BarPlot.drawChart({
                    id: id+'-bar', 
                    data: data.g.features.map(f => f.properties), 
                    xCol: data.indexCol, 
                    yCol: data.colorCol,
                    selected: index
                })
            }         
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