import {React, useState, useEffect} from 'react'
import {ChartSectionContainer, LoadingContainer, LoadingSpinner} from './Style'
import {Charts, Chart} from '../../Components/Chart'
import {RaceChart, AgeSexChart, CrimeChart, LineChart} from '../../Components/Plot'
import Banner from './Banner'
import * as DataLoading from './DataLoading'

const ChartSection = ({year, boundary, index, count}) => {
    const [lineData, setLineData] = useState(null)
    const [crimeTypeData, setCrimeTypeData] = useState(null)
    const [ageSexData, setAgeSexData] = useState(null)
    const [raceData, setRaceData] = useState(null)

    useEffect(() => {
        if(!index) return

        setLineData(null)
        setCrimeTypeData(null)
        setAgeSexData(null)
        setRaceData(null)

        DataLoading.LoadLineData({boundary, index}, (data) => {setLineData(data)})        
        DataLoading.LoadCrimeTypeData({year, boundary, index}, (data) => {setCrimeTypeData(data)})
        DataLoading.LoadAgeSexData({boundary, year, index}, (data) => {setAgeSexData(data)})
        DataLoading.LoadRaceData({year, boundary, index}, (data) => {setRaceData(data)})

    }, [year, boundary, index])

    const Line = () => {        
        if(lineData){
            return <LineChart data={lineData} xCol='year' yCol='count' id="yearly-count"></LineChart>                
        }else{
            if(index){
                return (
                    <LoadingContainer>
                        <LoadingSpinner></LoadingSpinner>
                        <div>Loading...</div>
                    </LoadingContainer>
                )
            }
        }
    } 
    
    const Crime = () => {
        if(crimeTypeData){
            return <CrimeChart data={crimeTypeData} xCol='label' yCol='value' id="crime-type"></CrimeChart>
        }else{
            if(index){
                return (
                    <LoadingContainer>
                        <LoadingSpinner></LoadingSpinner>
                        <div>Loading...</div>
                    </LoadingContainer>
                )
            }
        }
    }

    const AgeSex = () => {
        if(ageSexData){
            return <AgeSexChart data={ageSexData} x="age" y="value" subCat="sex" c1="M" c2="F" id="age-sex"></AgeSexChart>
        }else{
            if(index){
                return (
                    <LoadingContainer>
                        <LoadingSpinner></LoadingSpinner>
                        <div>Loading...</div>
                    </LoadingContainer>
                )
            }
        }
    }

    const Race = () => {
        if(raceData){
            return <RaceChart data={raceData} x='label' y='value' id="race"></RaceChart>
        }else{
            if(index){
                return (
                    <LoadingContainer>
                        <LoadingSpinner></LoadingSpinner>
                        <div>Loading...</div>
                    </LoadingContainer>
                )
            }
        }
    }

    return ( 
        <ChartSectionContainer>
            {!index && <LoadingContainer><div>Click on a boundary to continue</div></LoadingContainer>}

            <Banner year={year} boundary={boundary} index={index} count={count}></Banner>

            <Charts id='charts'>                
                <Chart title='test-title'>
                    {Line()}
                </Chart>

                <Chart title='test-title'>
                    {Crime()}
                </Chart>

                <Chart title='Test title'>
                    {AgeSex()}
                </Chart>

                <Chart title='Test title'>
                    {Race()}
                </Chart>
            </Charts>            
        </ChartSectionContainer>
     );
}
 
export default ChartSection;