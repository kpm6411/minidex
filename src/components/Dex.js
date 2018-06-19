import React, { Component } from 'react';

const pokeapiRoot = "https://pokeapi.co/api/v2/";

class Dex extends Component {
  constructor(props) {
    super();
    this.state = {
      dex: [],
      selectedMon: {},
      searchMon: ""
    }
  }

  //Load page with random pokemon
  componentWillMount() {
    let rand = Math.floor(Math.random() * 806 + 1);
    let pokeapi = pokeapiRoot + "pokemon/" + rand + "/";
    this.getMon(pokeapi);
  }

  //Prepare search with text input
  handleInput(e) {
    this.setState({ searchMon: e.target.value });
  }

  //Submits search when pressing Enter
  handleKeyUp(e) {
    if(e.keyCode === 13) {
      this.handleSearch();
    }
  }

  //Perform search for pokemon
  handleSearch() {
    if(this.state.searchMon.length > 0){
      let pokeapi = pokeapiRoot + "pokemon/" + this.state.searchMon + "/";
      this.getMon(pokeapi);
    }
  }

  //Call PokeAPI with specified mon name/number
  getMon(pokeapi) {
    let newMon = {};
    let dex = this.state.dex;

    fetch(pokeapi)
      .then(res => res.json())
      .then((data) => {
        newMon = data;
        dex.push(newMon);
        this.setState({
          selectedMon: newMon,
          dex: dex
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let mon = this.state.selectedMon

    return (
      <div className="dex">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search for Pokemon" onChange={this.handleInput.bind(this)} onKeyUp={this.handleKeyUp.bind(this)}/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={this.handleSearch.bind(this)}>Search</button>
          </div>
        </div>
        <h1>{mon.name}</h1>
        <h2>#{mon.id}</h2>
        <h2>
          {mon.types ? mon.types[0].type.name : 'Loading...'}
          {mon.types && mon.types[1] ? ' - ' +mon.types[1].type.name : ''}
        </h2>
      </div>
    );
  }
}

export default Dex;
