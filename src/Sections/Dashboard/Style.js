import styled from 'styled-components'

export const MainContainer = styled.div`
    display: flex;
    height: 600px;

    & > div{
        width: 50%;
    }
`

export const BannerContainer = styled.div`
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: center;

    & * {
        margin: 0;
    }
`

export const Summary = styled.div`
    & > div{
        width: 150px;
        display: flex;
        justify-content: space-between;
    }
`
export const ChartSectionContainer = styled.div`
    display: grid;
    grid-template-rows: 40px 1fr;
    grid-gap: 30px;
    height: 100%;
`

export const MapContainer = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: 75% 25%;  
    height: 100%; 
`

export const MapControls = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
`
