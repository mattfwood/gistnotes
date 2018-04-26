import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Gist from './components/Gist';

class App extends Component {
  state = {
    gists: [],
  };

  componentDidMount() {
    // get user's gists
    const axios = require('axios');

    // async IIFE
    (async () => {
      try {
        const { data } = await axios.get(
          'https://api.github.com/users/mattfwood/gists'
        );
        // console.log(data);
        this.setState({ gists: data });
      } catch (error) {
        console.log(error);
      }
    })();
  }

  render() {
    const { gists } = this.state;
    return (
      <div className="App">
        {gists.map(gist => (
          <Gist gist={gist} />
        ))}
      </div>
    );
  }
}

export default App;
