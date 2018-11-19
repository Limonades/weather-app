import React from 'react';
import PropTypes from 'prop-types';

class FavoritesItem extends React.Component {
  render() {
    const { name, id } = this.props;
    return (
      <li>
        <a href="/">{name}</a>
        {console.log(id)}
        <button type="button">X</button>
      </li>
    );
  }
}

FavoritesItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default FavoritesItem;
