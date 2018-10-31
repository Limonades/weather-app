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
    };
  }

  handleSubmit = e => {
    const { searchValue } = this.state;
    e.preventDefault();
    console.log('handle');

    // callApi(`${DOMAIN_URL}/?city=${searchValue}&key=${KEY}`)
    //   .then(response => {
    //     this.setState({
    //       // TODO если включить название города начинается путаница
    //       requestName: response.city_name,
    //       currentTemp: response.data[0].temp,
    //       error: null,
    //       isLoading: false,
    //       weekTemp: response.data,
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       error: err.message,
    //       currentTemp: null,
    //       isLoading: false,
    //     });
    //   });

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

  getData = (a, b) => {
    callApi(`${DOMAIN_URL}/?lat=${a}&lon=${b}&key=${KEY}`)
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

  getLat = obj => obj.l.j;

  getLon = obj => obj.l.l;

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
                });

                return this.getData(
                  this.getLat(place.geometry.viewport),
                  this.getLon(place.geometry.viewport)
                );
              }
              // TODO почему стейт не меняется? (он меняется но страничка не обновляе)
              return this.setState({
                currentTemp: null,
                weekTemp: null,
                isLoading: false,
                error: 'It looks like a mistake in the request',
              });
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
