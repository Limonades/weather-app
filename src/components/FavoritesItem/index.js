import React from 'react';
import PropTypes from 'prop-types';

class FavoritesItem extends React.Component {
  handleClick = () => {
    const { id, removeFromFavorites } = this.props;

    removeFromFavorites(id);
  };

  handleSearch = (e) => {
    e.preventDefault();
    // TODO поиск по избранным
    // const { lat, lng, name, getData } = this.props;
    //
    // getData(lat, lng, name);
  }

  render() {
    const { name } = this.props;
    // TODO срабатывает консоль всегда(бесит)
    return (
      <li>
        <a onClick={this.handleSearch} href="/">{name}</a>
        {/*{console.log(id)}*/}
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
};

export default FavoritesItem;
