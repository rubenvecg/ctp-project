import { useEffect, useState } from 'react';
import './App.css';
import * as Plot from './Components/Plot/React';
import MapBox from './Components/Plot/React/MapBox';


function App() {  

  const genData = (count) => {
    let data = []
    let labels = []

    for(var i=0; i<count; i++){
      data.push(Math.floor(Math.random() * 110))
      labels.push("Label #" + String.fromCharCode(i + 65))
    }

    return [data, labels]
  }

  const barProps = {
    width: 800,
    height: 500,
    backgroundColor: '#222',
    textColor: '#aaa',
    title: "Long plot title for testing x vs y",
    xLabel: "X axis",
    yLabel: "Y axis",
    marginLeft: 100,
    marginBottom: 150
  }

  const histProps = {
    width: 800,
    height: 500
  }

  
  const [data, setData] = useState(null)
  const [labels, setLabels] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)



  const toggleData = (length) => {
    const[gData,gLabels] = genData(length)

    setData(gData)
    setLabels(gLabels)
  }

  useEffect(() => {
    toggleData(10)
  }, [])
  
  return (
    
    <div>
        
        <Plot.BarChart 
          data={data} 
          labels={labels}            
          id='bar1' 
          props={barProps}>
        </Plot.BarChart>

        <select value={0} onChange={(e) => { if(e.target.value != 0) toggleData(e.target.value)}}> 
            <option></option>
            <option>10</option>
            <option>20</option>
            <option>30</option>  
        </select>  

        <Plot.Histogram 
          data={['a', 'b', 'c', 'd', 'd']}            
          id='hist1' 
          props={barProps}>
        </Plot.Histogram>

        <MapBox/>

        

            
    </div> 
  );
}

export default App;
