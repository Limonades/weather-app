import React from 'react';
import PropTypes from 'prop-types';

class FavoritesItem extends React.Component {
  handleClick = () => {
    const { id, removeFromFavorites } = this.props;

    removeFromFavorites(id);
  };

  handleSearch = e => {
    e.preventDefault();
    const { lat, lng, name, getData } = this.props;
    getData(lat, lng, name);
  };

  render() {
    const { name, favoritesWeather } = this.props;
    console.log(favoritesWeather);
    return (
      <li className="favorites__list-item">
        <a className="favorites__list-btn text-style-2" onClick={this.handleSearch} href="/">
          <p>{name}</p>

          {favoritesWeather ? <span>{favoritesWeather.result.data[0].temp}°</span> : null}
          <button className="favorites__list-remove-btn" onClick={this.handleClick} type="button">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              fill="white"
            >
              <path d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z" />
            </svg>
          </button>
        </a>
      </li>
    );
  }
}

FavoritesItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
};

FavoritesItem.defaultProps = {
  lat: null,
  lng: null,
};

export default FavoritesItem;
