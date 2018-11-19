import React from 'react';
import PropTypes from 'prop-types';
import FavoritesItem from '../FavoritesItem';

class FavoritesBar extends React.Component {
  render() {
    const { favorites } = this.props;
    return (
      <div>
        <h2>Favorites</h2>
        <ul>
          {favorites.map(town => (
            <FavoritesItem key={town.id} id={town.id} name={town.requestName} />
          ))}
        </ul>
      </div>
    );
  }
}

FavoritesBar.propTypes = {
  favorites: PropTypes.array.isRequired,
};

export default FavoritesBar;
