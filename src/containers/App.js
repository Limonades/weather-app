import React from 'react';
import './index.sass';
import Autocomplete from 'react-google-autocomplete';
import { callApi } from '../utils/Api';
import { DOMAIN_URL, KEY } from '../constants/ApiConstants';
import { Loader } from '../components/Loader';
import Week from '../components/Week';
import FavoritesBar from '../components/FavoritesBar';
import { convertIcon } from '../utils/Icons';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      requestName: '',
      searchValue: '',
      currentTemp: null,
      wind: null,
      weatherDescr: null,
      wetness: null,
      error: null,
      isLoading: false,
      weekTemp: null,
      lat: null,
      lng: null,
      favorites: [],
      popstateEvent: false,
      favoritesWeather: [],
      currentWeatherIcon: null,
      weekIcons: null,
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
      this.favoritesTemp(localData);
    }
  }

  componentDidUpdate() {
    const { favorites } = this.state;

    const localFavorites = JSON.parse(localStorage.getItem('localWeatherData'));
    const stateFavorites = JSON.stringify(favorites);

    if (!localFavorites) {
      return;
    }

    if (favorites.length !== localFavorites.length) {
      localStorage.setItem('localWeatherData', stateFavorites);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
  };

  handleClick = () => {
    const { lat, lng, searchValue } = this.state;

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

    // if (requestName) {
    //   this.setState({
    //     requestName: '',
    //   });
    // }
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
      // currentTemp: null,
      // error: null,
      isLoading: true,
      // currentWeatherIcon: null,
      // weekTemp: null,
      // weekIcons: null,
    });

    if (!lat && !lng && city !== '') {
      return callApi(`${DOMAIN_URL}/forecast/daily?city=${city}&key=${KEY}`)
        .then(response => {
          console.log(response);
          this.setState({
            requestName: response.city_name,
            currentTemp: response.data[0].temp,
            error: null,
            isLoading: false,
            weekTemp: response.data,
            currentWeatherIcon: response.data[0].weather.icon,
            weekIcons: response.data,
          });
          this.changeHash(response.lat, response.lon, response.city_name);
        })
        .catch(err => {
          this.setState({
            error: err.message,
            currentTemp: null,
            isLoading: false,
            lng: null,
            lat: null,
            weekTemp: null,
          });
        });
    }

    callApi(`${DOMAIN_URL}/?lat=${lat}&lon=${lng}&key=${KEY}`)
      .then(response => {
        console.log(response);
        this.setState({
          currentTemp: response.data[0].temp,
          wind: response.data[0].wind_spd,
          weatherDescr: response.data[0].weather.description,
          wetness: response.data[0].rh,
          error: null,
          isLoading: false,
          weekTemp: response.data,
          requestName: `${city}`,
          currentWeatherIcon: response.data[0].weather.icon,
        });
        this.changeHash(lat, lng, city);
      })
      .catch(err => {
        this.setState({
          error: err.message,
          currentTemp: null,
          isLoading: false,
          lng: null,
          lat: null,
          weekTemp: null,
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

    const title = '';
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

    if (newFavorites.length > 5) {
      newFavorites.length = 5;
    }

    const localData = JSON.stringify(newFavorites);

    localStorage.setItem('localWeatherData', localData);

    this.setState({
      favorites: newFavorites,
    });

    this.favoritesTemp(newFavorites);
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

    this.favoritesTemp(favoritesCopy);
  };

  checkFavorites = (arr, item) => arr.indexOf(item) === -1;

  favoritesTemp = localData => {
    const favArr = [];

    localData.forEach((item, index) => {
      favArr.push(
        new Promise((resolve, reject) => {
          fetch(`${DOMAIN_URL}/?lat=${item.lat}&lon=${item.lng}&key=${KEY}`)
            .then(res => res.json())
            .then(result => {
              const favItem = {
                index,
                result,
              };

              resolve(favItem);
            });
        })
      );
    });

    Promise.all(favArr).then(values => {
      values.sort((a, b) => a.index - b.index);

      this.setState({
        favoritesWeather: values,
      });
    });
  };

  checkRequest = place => {
    const { lat, lng } = this.state;

    if (place.geometry) {
      const latC = place.geometry.location.lat();
      const lngC = place.geometry.location.lng();
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

  getCurrentDate = () => {
    let day;
    let month;
    const date = new Date().getDate();

    switch (new Date().getDay()) {
      case 0:
        day = 'Sunday';
        break;
      case 1:
        day = 'Monday';
        break;
      case 2:
        day = 'Tuesday';
        break;
      case 3:
        day = 'Wednesday';
        break;
      case 4:
        day = 'Thursday';
        break;
      case 5:
        day = 'Friday';
        break;
      case 6:
        day = 'Saturday';
        break;
      default:
        console.log('error');
        break;
    }

    switch (new Date().getMonth()) {
      case 0:
        month = 'January';
        break;
      case 1:
        month = 'February';
        break;
      case 2:
        month = 'March';
        break;
      case 3:
        month = 'April';
        break;
      case 4:
        month = 'May';
        break;
      case 5:
        month = 'Jun';
        break;
      case 6:
        month = 'July';
        break;
      case 7:
        month = 'August';
        break;
      case 8:
        month = 'September';
        break;
      case 9:
        month = 'October';
        break;
      case 10:
        month = 'November';
        break;
      case 11:
        month = 'December';
        break;
      default:
        console.log('error');
        break;
    }

    return `${day} ${month}, ${date}`;
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
      favoritesWeather,
      wind,
      weatherDescr,
      wetness,
      currentWeatherIcon,
      weekIcons,
    } = this.state;
    return (
      <div className={isLoading ? 'main-wrap loading' : 'main-wrap'}>
        <div>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form__input-wrap">
              <div>
                <svg
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 14c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z" />
                </svg>
              </div>
              <Autocomplete
                className="text-style-2"
                value={searchValue}
                onChange={this.handleChange}
                placeholder="Type a location ..."
                onPlaceSelected={place => {
                  console.log(place);
                  this.checkRequest(place);
                }}
                types={['(regions)']}
              />
              <button type="button" onClick={this.handleClick} name="send">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
                </svg>{' '}
              </button>
            </div>
          </form>
          <div className="current-info__wrap">
            {currentTemp ? (
              <div className="current-info">
                <div className="current-info__title-wrap">
                  <h1 className="current-info__title text-style-3">{requestName}</h1>
                  <button
                    className="current-info__favorite-btn"
                    onClick={this.addToFavorites}
                    type="button"
                  >
                    <svg
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
                    </svg>
                  </button>
                </div>
                <p className="current-info__date">{this.getCurrentDate()}</p>
                <div className="current-info__info-wrap">
                  <div className="current-info__details">
                    <p>
                      Wind <strong>{wind}</strong> ms
                    </p>
                    <p>
                      Wetness <strong>{wetness}%</strong>
                    </p>
                  </div>
                  <div className="current-info__icon-wrap">
                    <i className={convertIcon(currentWeatherIcon)} />
                    <p>{weatherDescr}</p>
                  </div>
                  <p className="current-info__temp">{currentTemp}°</p>
                </div>
              </div>
            ) : null}
            {error ? <p className="error">{error}</p> : null}
            {isLoading ? (
              <div className="loader-wrap">
                <Loader />
              </div>
            ) : null}
            {weekTemp ? <Week weekIcons={weekIcons} weekTemp={weekTemp} /> : null}
          </div>
        </div>
        {favorites.length ? (
          <FavoritesBar
            removeFromFavorites={this.removeFromFavorites}
            lat={lat}
            lng={lng}
            favorites={favorites}
            getData={this.getData}
            favoritesWeather={favoritesWeather}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
