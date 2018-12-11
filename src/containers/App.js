import React from 'react';
import Autocomplete from 'react-google-autocomplete';
import { callApi } from '../utils/Api';
import { DOMAIN_URL, KEY } from '../constants/ApiConstants';
import { Loader } from '../components/Loader';
import Week from '../components/Week';
import FavoritesBar from '../components/FavoritesBar';

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
      favorites: [],
      popstateEvent: false,
    };
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('localWeatherData'));

    this.getUrl();

    window.addEventListener('popstate', () => {
      this.setState({
        popstateEvent: true,
      });

      this.getUrl();
    });

    if (localData) {
      this.setState({ favorites: localData });
    }
  }

  componentDidUpdate() {
    const { favorites } = this.state;

    const localFavorites = JSON.parse(localStorage.getItem('localWeatherData'));
    const stateFavorites = JSON.stringify(favorites);

    if (!localFavorites) {
      return false;
    }

    if (favorites.length !== localFavorites.length) {
      localStorage.setItem('localWeatherData', stateFavorites);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  handleClick = () => {
    const { lat, lng, searchValue, requestName } = this.state;

    if (searchValue !== '') {
      return this.getData(lat, lng, searchValue);
    }

    this.setState({
      currentTemp: null,
      error: 'Не в этот раз, петушок)',
      isLoading: false,
      weekTemp: null,
      lat: null,
      lng: null,
    });
  };

  handleChange = e => {
    const { lat, lng, requestName } = this.state;

    this.setState({
      searchValue: e.target.value,
    });

    if (lat && lng) {
      this.setState({
        lat: null,
        lng: null,
      });
    }

    if (requestName) {
      this.setState({
        requestName: '',
      });
    }
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
          // window.location.hash = `?city=${city}`;
          this.changeHash(response.lat, response.lon, response.name);
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
          requestName: `${city}`,
        });
        // window.location.hash = `?lat=${lat}&lon=${lng}`;
        this.changeHash(lat, lng, city);
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

  changeHash = (lat, lng, city) => {
    const { popstateEvent } = this.state;

    if (popstateEvent) {
      return this.setState({
        popstateEvent: false,
      });
    }

    const state = {
      lat,
      lng,
      city,
    };

    const title = ``;
    const url = `?lat=${lat}&lng=${lng}&city=${city}`;

    window.history.pushState(state, title, url);
  };

  getUrl = () => {
    const url = window.location.search;

    if (url) {
      const urlParams = new URLSearchParams(url);
      const urlLat = urlParams.get('lat');
      const urlLng = urlParams.get('lng');
      const urlName = urlParams.get('city');

      this.getData(urlLat, urlLng, urlName);
    } else {
      this.setState({
        currentTemp: null,
        weekTemp: null,
      });
    }
  };

  addToFavorites = () => {
    const { lat, lng, requestName, favorites } = this.state;

    const data = {
      id: Date.now(),
      lat,
      lng,
      requestName,
    };

    const newFavorites = favorites;
    const newFavoritesNames = [];

    newFavorites.forEach(item => {
      newFavoritesNames.push(item.requestName);
    });

    if (!this.checkFavorites(newFavoritesNames, data.requestName)) {
      return;
    }

    newFavorites.unshift(data);

    const localData = JSON.stringify(newFavorites);

    localStorage.setItem('localWeatherData', localData);

    this.setState({
      favorites: newFavorites,
    });
  };

  removeFromFavorites = e => {
    const { favorites } = this.state;
    const favoritesCopy = favorites.slice();
    const favoritesId = [];

    favoritesCopy.forEach(item => {
      favoritesId.push(item.id);
    });

    const index = favoritesId.indexOf(e);

    favoritesCopy.splice(index, 1);

    this.setState({
      favorites: favoritesCopy,
    });
  };

  checkFavorites = (arr, item) => arr.indexOf(item) === -1;

  checkRequest = place => {
    const { lat, lng } = this.state;

    if (place.geometry) {
      const latC = place.geometry.viewport.la.j;
      const lngC = place.geometry.viewport.la.l;
      const cityC = place.formatted_address;

      this.setState({
        searchValue: '',
        lat: latC,
        lng: lngC,
      });

      return this.getData(latC, lngC, cityC);
    }
    const city = place.name;

    this.getData(lat, lng, city);
  };

  render() {
    const {
      requestName,
      searchValue,
      currentTemp,
      error,
      isLoading,
      weekTemp,
      favorites,
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
              console.log(place);
              this.checkRequest(place);
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
            <button onClick={this.addToFavorites} type="button">
              Добавить в Избранное
            </button>
            <p style={{ fontSize: `${36}px` }}>Now {currentTemp}° градусиков</p>
          </div>
        ) : null}
        {error ? <p style={{ fontSize: `${36}px`, color: 'brown' }}>{error}</p> : null}
        {isLoading ? <Loader /> : null}
        {weekTemp ? <Week weekTemp={weekTemp} /> : null}
        {favorites.length ? (
          <FavoritesBar
            removeFromFavorites={this.removeFromFavorites}
            lat={lat}
            lng={lng}
            favorites={favorites}
            getData={this.getData}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
