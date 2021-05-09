import React from 'react';
import mapboxgl from 'mapbox-gl';
import "../../../Styles/MapBox.scss"

mapboxgl.accessToken = 'pk.eyJ1IjoibWljZXVoIiwiYSI6ImNrb2hnc3lpMTBhdzcycXJtdWF2ZmgyNG4ifQ.XNHI7U3ZMKLvZsNPL-ZxQw';

class MapBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: -74,
      lat: 40.7,
      zoom: 9
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      // style: 'mapbox://styles/mapbox/streets-v9',
      style: 'mapbox://styles/miceuh/ckohhgeae4y1u17od2xxrn5to',
      center: [lng, lat],
      zoom
    });
		
     map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div className="mapbox-container">
        <div ref={el => this.mapContainer = el} className="mapbox-structure"/>
      </div>
    );
  }
}

export default MapBox;
