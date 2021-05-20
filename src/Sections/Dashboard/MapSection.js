import {GeoJSONMap} from '../../Components/Plot'
import {MapContainer, MapControls, LoadingContainer, LoadingSpinner} from './Style'

const buildYearOptions = () => {
    const options = []
    for(let y=2020; y>=2006; y--){
        options.push(<option>{y}</option>)
    }
    return options
}

const MapSection = ({year, boundary, index, onBoundaryClick, onBoundaryChange, onYearChange}) => {
    return (
        <MapContainer>
            <GeoJSONMap year={year} boundary={boundary} index={index} id="map"
            onBoundaryClick={(d) => {onBoundaryClick(d)}}>

            <MapControls>
                <select value={boundary}          
                        onChange={(e) => {
                            onBoundaryChange(e.target.value)
                        }}>
                    <option value='boroughs'>Boroughs</option>
                    <option value='schoolDistricts'>School Districts</option>
                    <option value='policePrecincts'>Police Precincts</option>
                </select>

                <select value={year} 
                        onChange={(e) => 
                            onYearChange(e.target.value)
                        }>
                    {buildYearOptions()}
                </select>     
            </MapControls>  
        </GeoJSONMap>

        <div><div id='map-bar'></div></div>
        </MapContainer>
    );
}
 
export default MapSection;