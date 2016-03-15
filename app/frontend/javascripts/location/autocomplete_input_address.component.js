import { Component } from 'react';

export default class AutocompleteInputAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: this.props.latitude || 41.3833,
      longitude: this.props.longitude || 2.1833,
      zoom: (this.props.latitude && this.props.longitude) ? 15 : 12
    }
  }

  componentDidMount() {
    this.createGmapsIntegration();
  }

  createGmapsIntegration() {
    GoogleMapsAPI.then((google) => {
      this.autocomplete = new google.maps.places.Autocomplete(
        this.refs.addressInput,
        { 
          componentRestrictions: { 
            country: 'es' 
          }
        }
      );

      this.autocomplete.addListener('place_changed', () => { 
        clearTimeout(this.inputEventTimeoutId);
        let place = this.autocomplete.getPlace();

        if (place.geometry) {
          this.onPlaceChanged(place.geometry.location) 
        }
      });
    });
  }

  onKeyDown(event) {
    let key = event.keyCode;

    if (key === 13) { // Prevent form submission
      event.preventDefault();
    }
  }

  onInputBlur(search) {
    this.inputEventTimeoutId = setTimeout(() => {
      if (search.length > 0) {
        this.service.textSearch({ 
          query: search,
          componentRestrictions: { 
            country: 'es' 
          }
        }, (results, status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            this.refs.addressInput.value = results[0].formatted_address;
            this.onPlaceChanged(results[0].geometry.location);
          }
        });
      }
    }, 200);
  }

  onPlaceChanged(location) {
    let latitude = location.lat(),
        longitude = location.lng(),
        zoom = 15;

    this.setState({ latitude, longitude, zoom });
  }

  onMapInit(map) {
    this.service = new google.maps.places.PlacesService(map);
  }

  render() {
    return (
      <div>
        <input type="text"
          ref="addressInput"
          placeholder="Introdueix una adreca"
          name={this.props.addressInputName}
          defaultValue={this.props.address} 
          onKeyDown={(event) => this.onKeyDown(event)}
          onBlur={(event) => this.onInputBlur(event.currentTarget.value)} />
        <input type="hidden"
          name={this.props.latitudeInputName}
          value={this.state.latitude} />
        <input type="hidden"
          name={this.props.longitudeInputName}
          value={this.state.longitude} />
        <StaticMap 
          longitude={this.state.longitude} 
          latitude={this.state.latitude} 
          zoom={this.state.zoom} 
          onMapInit={(map) => this.onMapInit(map)} />
      </div>
    )
  }
}
