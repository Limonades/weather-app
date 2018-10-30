import React from 'react';
import { callApi } from '../utils/Api';
import { DOMAIN_URL, KEY } from '../constants/ApiConstants';
import { Loader } from '../constants/Loader';
import Day from '../components/Day';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      search: 'odessa',
      temp: null,
      error: null,
      isLoading: false,
      arr: [],
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
      arr: [],
    });
  };

  handleChange = e => {
    this.setState({
      search: e.target.value,
    });
  };

  getData = () => {
    const { search } = this.state;
    callApi(`${DOMAIN_URL}/forecast/daily?city=${search}&key=${KEY}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          temp: response.data[0].temp,
          error: null,
          isLoading: false,
          arr: response.data,
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
    const { search, temp, error, isLoading, arr } = this.state;
    console.log(arr);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="search" onChange={this.handleChange} value={search} />
          <button type="submit">search</button>
        </form>

        {temp ? <p style={{ fontSize: `${36}px` }}>сейчас в {temp} градусиков</p> : null}
        {error ? <p style={{ fontSize: `${36}px`, color: 'brown' }}>{error}</p> : null}
        {isLoading ? <Loader /> : null}
        {arr ? <Day arr={arr} /> : null}
      </div>
    );
  }
}

export default App;
