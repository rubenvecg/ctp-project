import styled from 'styled-components'

export const Grid = styled.div`
    height: 100%;
    display: grid;
    grid-template-rows: 49% 49%;
    grid-template-columns: 49% 49%;
    grid-gap: 2%;
`

export const ChartContainer = styled.div`
    display: grid;
    flex-direction: column;
    grid-template-rows: 30px 1fr;
    border: 1px solid #2F414F;
    padding: 5px;
    box-shadow: #666 0px 1px 2px;
    position: relative;
`