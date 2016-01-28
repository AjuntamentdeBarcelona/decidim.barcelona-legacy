class StaticMap extends React.Component {
  componentDidMount() {
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
            zoom: this.props.zoom,
            center: centerLocation,
            draggable: false,
            scrollwheel: false,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            streetViewControl: false
          }
        );
      }

      this.marker = new google.maps.Marker({
        position: centerLocation,
        animation: google.maps.Animation.DROP,
        map: this.map
      });
    });
  }

  render() {
    return (
      <div ref="map" className="static-map"></div>
    );
  }
}
