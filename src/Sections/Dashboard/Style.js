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
    position: relative;
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
    top: 10;
    left: 10;
    display: flex;
`

export const LoadingContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(47, 79, 79, 0.8);
    z-index: 8;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 11px;
`

export const LoadingSpinner = styled.div`
    width: 20px;
    height: 20px;
    border: solid 5px white;
    border-top: solid 5px darkslategrey;
    border-radius: 50%;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }
      
    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
`
