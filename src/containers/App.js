import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { callApi } from '../utils/Api';
import { DOMAIN_URL, KEY } from '../constants/ApiConstants';
import { Loader } from '../constants/Loader';
import Day from '../components/Day';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchValue: '',
      currentTemp: null,
      requestName: null,
      error: null,
      isLoading: false,
      weekTemp: null,
      lat: '',
      lng: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('handle');

    this.getData();

    this.setState({
      searchValue: '',
      currentTemp: null,
      error: null,
      isLoading: true,
      weekTemp: null,
    });
  };

  handleChange = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  getData = () => {
    const { lat, lng } = this.state;
    console.log(lat);
    console.log(lng);
    callApi(`${DOMAIN_URL}/?lat=${lat}&lon=${lng}&key=${KEY}`)
      .then(response => {
        this.setState({
          currentTemp: response.data[0].temp,
          error: null,
          isLoading: false,
          weekTemp: response.data,
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          currentTemp: null,
          isLoading: false,
        });
      });
  };

  render() {
    const { searchValue, currentTemp, error, isLoading, weekTemp, requestName } = this.state;
    // console.log(weekTemp);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Autocomplete
            value={searchValue}
            onChange={this.handleChange}
            style={{ width: '90%' }}
            onPlaceSelected={place => {
              if (place.geometry) {
                console.log(place.formatted_address);
                this.setState({
                  requestName: place.formatted_address,
                  searchValue: '',
                  lat: place.geometry.viewport.l.j,
                  lng: place.geometry.viewport.l.l,
                });
              } else {
                this.setState({
                  currentTemp: null,
                  weekTemp: null,
                  isLoading: false,
                  error: 'It looks like a mistake in the request',
                });
              }
            }}
            types={['(regions)']}
            componentRestrictions={{ country: 'ru' }}
          />
          <button type="submit">search</button>
        </form>

        {currentTemp ? (
          <div>
            <h1>{requestName}</h1>
            <p style={{ fontSize: `${36}px` }}>Now {currentTemp}° градусиков</p>
          </div>
        ) : null}
        {error ? <p style={{ fontSize: `${36}px`, color: 'brown' }}>{error}</p> : null}
        {isLoading ? <Loader /> : null}
        {weekTemp ? <Day weekTemp={weekTemp} /> : null}
      </div>
    );
  }
}

export default App;
