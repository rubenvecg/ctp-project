import {ChartContainer} from './Style'

const Chart = ({title, children}) => {
    return (
        <ChartContainer>
            <div>{title}</div>
            <div>
                {children}
            </div>
        </ChartContainer>
    );
}
 
export default Chart;