import {ChartContainer} from './Style'

const Chart = ({title, children}) => {
    return (
        <ChartContainer>
            <div class="chart-title">{title}</div>
            <div>
                {children}
            </div>
        </ChartContainer>
    );
}
 
export default Chart;