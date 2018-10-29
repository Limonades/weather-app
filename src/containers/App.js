import React from 'react';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      temp: null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.getData();

    this.setState({
      search: '',
    });
  };

  handleChange = e => {
    this.setState({
      search: e.target.value,
    });
  };

  getData = () => {
    const { search } = this.state;
    fetch(
      `https://api.weatherbit.io/v2.0/current?city=${search}&key=8fab1e8c72554b01807ac34da3e2cbfc`
    )
      .then(response => response.json())
      .then(response => {
        console.log(response);

        console.log(response.data[0].temp);

        this.setState({
          temp: response.data[0].temp,
        });
      })
      .catch(console.error);
  };

  render() {
    const { search, temp } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="search" onChange={this.handleChange} value={search} />
          <button type="submit">search</button>
        </form>

        {temp ? <p style={{ fontSize: `${36}px` }}>{temp} градусиков</p> : null}
      </div>
    );
  }
}

export default App;
