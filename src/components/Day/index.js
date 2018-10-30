import React from 'react';

class Day extends React.Component {
  render() {
    const { arr } = this.props;
    const week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return (
      <div style={{ display: `flex` }}>
        {arr.slice(0, 6).map((day, index) => (
          <div style={{ marginRight: `36px` }} key={index}>
            <p>{week[index]}</p>
            <p>{day.temp}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Day;
