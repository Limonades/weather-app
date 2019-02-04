import React from 'react';
import PropTypes from 'prop-types';
import './index.sass';

class Week extends React.Component {
  defineDay = ts => {
    // console.log(new Date(1000 * ts));
    switch (new Date(1000 * ts).getDay()) {
      case 0:
        return 'S';
      case 1:
        return 'M';
      case 2:
        return 'T';
      case 3:
        return 'W';
      case 4:
        return 'T';
      case 5:
        return 'F';
      case 6:
        return 'S';
      default:
        console.log('error');
        break;
    }
  };

  render() {
    const { weekTemp } = this.props;
    return (
      <div className="week__week">
        <div className="week__day-wrap">
          {weekTemp.slice(1, 8).map((day, index) => (
            <div className="week__day" key={index}>
              <p>{this.defineDay(day.ts)}</p>
              <i>w</i>
              <p>{day.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Week.propTypes = {
  weekTemp: PropTypes.array.isRequired,
};

export default Week;
