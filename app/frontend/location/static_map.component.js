import { Component, PropTypes } from 'react';

export default class StaticMap extends Component {
  componentDidMount() {
    this.createGmapsIntegration();
  }

  componentDidUpdate() {
    this.createGmapsIntegration();
  }

  createGmapsIntegration() {
    GoogleMapsAPI.then((google) => {
      let centerLocation = {
        lat : this.props.latitude,
        lng: this.props.longitude
      };

      if(!this.map) {
        this.map = new google.maps.Map(
          this.refs.map, 
          {
            draggable: false,
            scrollwheel: false,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            streetViewControl: false
          }
        );

        if(this.props.onMapInit) {
          this.props.onMapInit(this.map);
        }
      }

      this.map.panTo(centerLocation);
      this.map.setZoom(this.props.zoom);

      if (!this.marker) {
        this.marker = new google.maps.Marker({
          animation: google.maps.Animation.DROP,
          map: this.map
        });
      }

      this.marker.setPosition(centerLocation);
    });
  }

  render() {
    const { height } = this.props;

    return (
      <div ref="map" className="static-map" style={{height: (height || 120) + 'px'}}></div>
    );
  }
}

StaticMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  onMapInit: PropTypes.func,
  zoom: PropTypes.number.isRequired,
  height: PropTypes.number
};
