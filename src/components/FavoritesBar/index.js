import React from 'react';
import PropTypes from 'prop-types';
import FavoritesItem from '../FavoritesItem';
import './index.sass';

class FavoritesBar extends React.Component {
  render() {
    const { favorites, removeFromFavorites, getData, favoritesWeather } = this.props;
    console.log(favoritesWeather);
    return (
      <div className="favorites">
        <h2 className="text-style-2">
          <svg
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
          </svg>
          Favorites
        </h2>
        <ul className="favorites__list">
          {favorites.map((town, i) => (
            <FavoritesItem
              removeFromFavorites={removeFromFavorites}
              favoritesWeather={favoritesWeather[i]}
              getData={getData}
              key={town.id}
              id={town.id}
              name={town.requestName}
              lat={town.lat}
              lng={town.lng}
            />
          ))}
        </ul>
      </div>
    );
  }
}

FavoritesBar.propTypes = {
  favorites: PropTypes.array.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
};

export default FavoritesBar;
