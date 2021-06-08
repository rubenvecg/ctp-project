import {useEffect, useState} from 'react'
import {getColName, getGeoJSONLink} from '../../HelperFunctions/Indexing'
import * as d3 from 'd3'
import {GeoJSONMap} from '../../Components/Plot'
import {MapContainer, MapControls, LoadingContainer, LoadingSpinner} from './Style'

const buildYearOptions = () => {
    const options = []
    for(let y=2020; y>=2006; y--){
        options.push(<option key={'y-' + y}>{y}</option>)
    } 
    return options
}

const MapSection = ({year, boundary, index, onBoundaryClick, onBoundaryChange, onYearChange}) => {
    const [geoJSON, setGeoJSON] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const colName = (boundary == "boroughs") ? getColName(boundary).name : getColName(boundary)

    useEffect(() => {
        setIsLoaded(false)        
        d3.json(getGeoJSONLink(boundary))
        .then((g) => {
            setGeoJSON(g)  
            setIsLoaded(true)          
        })
        .catch((error) => {
            console.log(error)
        })              
    }, [boundary, year])

    useEffect(() => {
        if(!geoJSON || !index) return

        const f = geoJSON.features.filter(f => f.properties[colName] == index)[0]

        onYearChange(year, f.properties['CrimeCount_'+year])
    }, [year])
    
    if(!isLoaded){
        return (
            <MapContainer>
                <LoadingContainer>
                        <LoadingSpinner></LoadingSpinner>
                        <div>Loading...</div>
                </LoadingContainer>
            </MapContainer>
        )
    }else{

        const mapData = {
            g: geoJSON,
            indexCol: colName,
            colorCol: 'CrimeCount_' + year 
        }

        return (
                <MapContainer>
                    <GeoJSONMap data={mapData} year={year} boundary={boundary} index={index}
                    id="map" onBoundaryClick={(d) => {onBoundaryClick(d)}} showBar>
        
                    <MapControls>
                        <select className='select' value={boundary} onChange={(e) => onBoundaryChange(e.target.value)}>
                            <option value='boroughs'>Boroughs</option>
                            <option value='schoolDistricts'>School Districts</option>
                            <option value='policePrecincts'>Police Precincts</option>
                        </select>
        
                        <select className='select' value={year} onChange={(e) => onYearChange(e.target.value)}>
                            {buildYearOptions()}
                        </select>     
                    </MapControls>  
                </GeoJSONMap>
        
                <div><div id='map-bar'></div></div>
                </MapContainer>
            );
    }
    
}
 
export default MapSection;