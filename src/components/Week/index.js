import React from 'react';
import PropTypes from 'prop-types';
import './index.sass';

class Week extends React.Component {
  defineDay = ts => {
    // console.log(new Date(1000 * ts));
    switch (new Date(1000 * ts).getDay()) {
      case 0:
        return 'Sunday';
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        console.log('error');
        break;
    }
  };

  render() {
    const { weekTemp } = this.props;
    return (
      <div>
        <h5 className="week__title">forecast for the week</h5>
        <div className="week__day-wrap">
          {weekTemp.slice(1, 8).map((day, index) => (
            <div className="week__day" key={index}>
              <p>{this.defineDay(day.ts)}</p>
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
