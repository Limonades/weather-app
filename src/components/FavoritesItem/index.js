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
    // console.log(name);
    getData(lat, lng, name);
  };

  render() {
    const { name } = this.props;
    return (
      <li>
        <a onClick={this.handleSearch} href="/">
          {name}
        </a>
        <button onClick={this.handleClick} type="button">
          X
        </button>
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
