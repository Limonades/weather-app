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
      requestName: '',
      searchValue: '',
      currentTemp: null,
      error: null,
      isLoading: false,
      weekTemp: null,
      lat: null,
      lng: null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  handleClick = () => {
    const { lat, lng, searchValue } = this.state;
    this.getData(lat, lng, searchValue);
  };

  handleChange = e => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  getData = (lat, lng, city) => {
    if (!lat && !lng && city === '') {
      return this.setState({
        searchValue: '',
        currentTemp: null,
        error: 'Не в этот раз, петушок)',
        isLoading: false,
        weekTemp: null,
      });
    }

    this.setState({
      searchValue: '',
      currentTemp: null,
      error: null,
      isLoading: true,
      weekTemp: null,
    });

    if (!lat && !lng && city !== '') {
      return callApi(`${DOMAIN_URL}/forecast/daily?city=${city}&key=${KEY}`)
        .then(response => {
          this.setState({
            requestName: response.city_name,
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
    }

    callApi(`${DOMAIN_URL}/?lat=${lat}&lon=${lng}&key=${KEY}`)
      .then(response => {
        this.setState({
          currentTemp: response.data[0].temp,
          error: null,
          isLoading: false,
          weekTemp: response.data,
          lng: null,
          lat: null,
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          currentTemp: null,
          isLoading: false,
          lng: null,
          lat: null,
        });
      });
  };

  render() {
    const {
      requestName,
      searchValue,
      currentTemp,
      error,
      isLoading,
      weekTemp,
      lat,
      lng,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Autocomplete
            value={searchValue}
            onChange={this.handleChange}
            style={{ width: '50%' }}
            onPlaceSelected={place => {
              if (place.geometry) {
                const latC = place.geometry.viewport.l.j;
                const lngC = place.geometry.viewport.l.l;
                const cityC = place.formatted_address;

                this.setState({
                  requestName: cityC,
                  searchValue: '',
                  lat: latC,
                  lng: lngC,
                });

                return this.getData(latC, lngC, cityC);
              }
              const city = place.name;

              this.getData(lat, lng, city);
            }}
            types={['(regions)']}
          />
          <button type="button" onClick={this.handleClick} name="send">
            search
          </button>
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
