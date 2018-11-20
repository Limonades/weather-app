import React from 'react';
import PropTypes from 'prop-types';
import FavoritesItem from '../FavoritesItem';

class FavoritesBar extends React.Component {
  render() {
    const { favorites, removeFromFavorites, lat, lng, getData } = this.props;
    return (
      <div>
        <h2>Favorites</h2>
        <ul>
          {favorites.map(town => (
            <FavoritesItem
              removeFromFavorites={removeFromFavorites}
              getData={getData}
              key={town.id}
              id={town.id}
              name={town.requestName}
              lat={lat}
              lng={lat}
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
};

export default FavoritesBar;
