import React, { Component } from 'react';
import SelectedMon from './SelectedMon';

const pokeapiRoot = "https://pokeapi.co/api/v2/";

class Dex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dex: {},
      selectedMon: {},
      searchMon: "",
      stats: [50,50,50,50,50,50],
      message: "Loading..."
    }
  }

  //Load page with random pokemon
  componentWillMount() {
    var localDex = localStorage.getItem("pokedex");
    if(localDex) {
      localDex = JSON.parse(localDex);
      this.setState({ dex: localDex });
    }

    let rand = Math.floor(Math.random() * 806 + 1);

    if(!this.checkDex(rand)) {
      let pokeapi = pokeapiRoot + "pokemon/" + rand + "/";
      this.getMon(pokeapi);
    }
  }

  // Searches dex to see if mon is cached. Returns bool, if false should run this.getMon()
  checkDex(query) {
    let match = false;
    let matchMon;
    let searchId = parseInt(query, 10);

    if(!isNaN(searchId)) {
      for(var mon in this.state.dex) {
        if(mon.id === searchId) {
          match = true;
          matchMon = mon;
          break;
        }
      }
    } else {
      if(this.state.dex[query]) {
        match = true;
        matchMon = this.state.dex[query];
      }
    }

    if(match) {
      var statArr = [];
      matchMon.stats.forEach((e) => statArr.unshift(e.base_stat));
      this.setState({
        selectedMon: matchMon,
        stats: statArr
      });
    }

    return match;
  }

  //Prepare search with text input
  handleInput(e) {
    this.setState({ searchMon: e.target.value.toLowerCase() });
  }

  //Submits search when pressing Enter
  handleKeyUp(e) {
    if(e.keyCode === 13 && ( this.state.message === "Not found." || this.state.selectedMon.types)) {
      this.handleSearch();
    }
  }

  //Perform search for pokemon
  handleSearch() {
    if(this.state.searchMon.length > 0){
      this.setState({
        selectedMon: {},
        message: "Loading..."
      });
      if(!this.checkDex(this.state.searchMon)){
        let pokeapi = pokeapiRoot + "pokemon/" + this.state.searchMon + "/";
        this.getMon(pokeapi);
      }
    }
  }

  //Call PokeAPI with specified mon name/number
  getMon(pokeapi) {
    let newMon = {};
    let dex = this.state.dex;
    let statArr = [];
    let speciesAPI = "";
    let species = {};

    fetch(pokeapi)
      .then(res => res.json())
      .then((data) => {
        newMon = data;
        dex[newMon.name] = newMon;
        speciesAPI = newMon.species.url;
        newMon.stats.forEach((e) => statArr.unshift(e.base_stat));
      })
      .then(() => {
        fetch(speciesAPI)
        .then(res => res.json())
        .then((data) => {
          species = data;
          dex[newMon.name].species = species;
          localStorage.setItem("pokedex", JSON.stringify(dex));
          this.setState({
            selectedMon: newMon,
            dex: dex,
            stats: statArr
          });
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ message: "Not found." });
      });
  }

  render() {
    return (
      <div className="dex">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search for Pokemon" onChange={this.handleInput.bind(this)} onKeyUp={this.handleKeyUp.bind(this)}/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={this.handleSearch.bind(this)}>Search</button>
          </div>
        </div>
        <SelectedMon mon={this.state.selectedMon} stats={this.state.stats} message={this.state.message}/>
      </div>
    );
  }
}

export default Dex;
