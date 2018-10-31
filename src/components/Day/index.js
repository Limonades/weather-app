import React from 'react';

class Day extends React.Component {
  defineDay = ts => {
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
      // TODO remove inline styles
      <div>
        <h5 style={{ marginBotoom: 0 }}>forecast for the week</h5>
        <div style={{ display: `flex` }}>
          {weekTemp.slice(1, 8).map((day, index) => (
            <div style={{ marginRight: `36px` }} key={index}>
              <p>{this.defineDay(day.ts)}</p>
              <p>{day.temp}°</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Day;
