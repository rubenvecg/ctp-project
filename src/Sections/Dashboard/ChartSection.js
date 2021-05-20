import {ChartSectionContainer, LoadingContainer} from './Style'
import {Charts, Chart} from '../../Components/Chart'
import {RaceChart, AgeSexChart, CrimeChart, AreaChart} from '../../Components/Plot'
import Banner from './Banner'

const ChartSection = ({year, boundary, index, count}) => {
    return ( 
        <ChartSectionContainer>
            <LoadingContainer><div>Loading...</div></LoadingContainer>

            <Banner year={year} boundary={boundary} index={index} count={count}></Banner>

            <Charts id='charts'>
                <Chart title='Test title'>
                    <AreaChart by={boundary} index={index} id="yearly-count"></AreaChart>
                </Chart>
                
                <Chart title='Test title'>
                    <CrimeChart year={year} by={boundary} index={index} id="crime-type"></CrimeChart>
                </Chart>

                <Chart title='Test title'>
                    <AgeSexChart year={year} by={boundary} index={index} id="age-sex"></AgeSexChart>
                </Chart>
                
                <Chart title='Test title'>
                    <RaceChart year={year} by={boundary} index={index} id="race"></RaceChart>
                </Chart>
            </Charts>
            
        </ChartSectionContainer>
     );
}
 
export default ChartSection;