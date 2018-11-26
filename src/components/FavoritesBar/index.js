import React from 'react';
import PropTypes from 'prop-types';
import FavoritesItem from '../FavoritesItem';

class FavoritesBar extends React.Component {
  render() {
    const { favorites, removeFromFavorites, getData } = this.props;
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
