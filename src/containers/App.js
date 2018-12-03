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
      inFavorites: false,
    };
  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('localWeatherData'));

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
    const { lat, lng, searchValue, requestName} = this.state;

    // if (searchValue !== '') {
      return this.getData(lat, lng, searchValue);
    // }

    // this.setState({
    //   currentTemp: null,
    //   error: 'Не в этот раз, петушок)',
    //   isLoading: false,
    //   weekTemp: null,
    // });
  };

  handleChange = e => {
    const { lat, lng, requestName, inFavorites } = this.state;

    this.setState({
      searchValue: e.target.value,
    });

    if (lat && lng) {
      this.setState({
        lat: null,
        lng: null,
      });
    }

    if (inFavorites) {
      this.setState({
        inFavorites: false,
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

  addToFavorites = () => {
    const { lat, lng, requestName, favorites, inFavorites } = this.state;

    const data = {
      id: Date.now(),
      lat,
      lng,
      requestName,
    };

    console.log(requestName);

    const newFavorites = favorites;
    console.log(newFavorites);
    // TODO не добавлять такой же элемент (po cityname)
    // console.log(newFavorites.includes(data));

    // TODO проверь - нормальный ли способ проверки избранных
    // 1 добавил нових стейт "изфейворит"
    // 2 проверяю по нему ниже если он фолс то могу добавлять город (и проверку города тоже проверь)
    // 3 обновляю изФейворит каждый раз нажатии на инпут и по кнопке удалить
    newFavorites.forEach(item => {
      if (requestName === item.requestName) {
        return this.setState({
          inFavorites: true,
        });
      }
    });

    if (!inFavorites) {
      newFavorites.unshift(data);

      const localData = JSON.stringify(newFavorites);

      localStorage.setItem('localWeatherData', localData);

      return this.setState({
        favorites: newFavorites,
        inFavorites: true,
      });
    }
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
      inFavorites: false,
    });
  };

  checkRequest = place => {
    const { lat, lng } = this.state;

    if (place.geometry) {
      const latC = place.geometry.viewport.l.j;
      const lngC = place.geometry.viewport.l.l;
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
