const style={
    position: 'absolute',
    top: 0,
    left: 0
}

const BoundarySelector = ({value, onChange}) => {
    return (
    <select style={style} value={value} 
            onChange={(e) => onChange(e.target.value)}>
        <option>boroughs</option>
        <option>schoolDistricts</option>
        <option>policePrecincts</option>
    </select>)
}
 
export default BoundarySelector;