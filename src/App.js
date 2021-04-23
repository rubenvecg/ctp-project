import './App.css';
import * as Plot from './Components/Plot/React';


function App() {  
  const data1 = [12, 5, 6, 6, 9, 10];
  const data2 = [1, 10, 15, 12, 10, 2];
  
  
  return (
    
    <div>
      <div>Testing</div>
      <Plot.BarChart data={data1} id='bar1'></Plot.BarChart>
      <Plot.PieChart id='pie1'></Plot.PieChart>
      <Plot.Histogram id='hist1'></Plot.Histogram>
      <Plot.Choropleth id='choro1'></Plot.Choropleth> 
    </div> 
  );
}

export default App;
