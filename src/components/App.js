import React, { Component } from 'react';
import Dex from './Dex';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="top-bar">
          <h2>Minidex</h2>
          <p>The streamlined Pokedex app</p>
        </div>
        <Dex />
      </div>
    );
  }
}

export default App;
