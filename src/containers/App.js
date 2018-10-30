import React from 'react';
import { callApi } from '../utils/Api';
import { DOMAIN_URL, KEY } from '../constants/ApiConstants';
import { Loader } from '../constants/Loader';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      temp: null,
      error: null,
      isLoading: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.getData();

    this.setState({
      search: '',
      temp: null,
      error: null,
      isLoading: true,
    });
  };

  handleChange = e => {
    this.setState({
      search: e.target.value,
    });
  };

  getData = () => {
    const { search } = this.state;
    callApi(`${DOMAIN_URL}/current?city=${search}&key=${KEY}`)
      .then(response => {
        this.setState({
          temp: response.data[0].temp,
          error: null,
          isLoading: false,
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          temp: null,
          isLoading: false,
        });
      });
  };

  render() {
    const { search, temp, error, isLoading } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="search" onChange={this.handleChange} value={search} />
          <button type="submit">search</button>
        </form>

        {temp ? <p style={{ fontSize: `${36}px` }}>{temp} градусиков</p> : null}
        {error ? <p style={{ fontSize: `${36}px` }}>{error}</p> : null}
        {isLoading ? <Loader /> : null}
      </div>
    );
  }
}

export default App;
