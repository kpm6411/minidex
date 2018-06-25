import React, { Component } from 'react';
import Stats from './Stats';

const pokeapiRoot = "https://pokeapi.co/api/v2/";

class Dex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dex: [],
      selectedMon: {},
      searchMon: "",
      stats: [50,50,50,50,50,50]
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
        let statArr = [];
        newMon.stats.forEach((e) => statArr.unshift(e.base_stat));
        this.setState({
          selectedMon: newMon,
          dex: dex,
          stats: statArr
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    let mon = this.state.selectedMon
    let type1 = undefined;
    let type2 = undefined;
    let className1 = "typing";
    let className2 = ""
    let spriteClass = "sprite"

    if(mon.types) {
      type1 = mon.types[0].type.name;
      className1 += " " + type1;
      spriteClass += " " + type1;
      if(mon.types[1]){
        type2 = mon.types[1].type.name;
        className2 += "typing " + type2;
      }
    }

    return (
      <div className="dex">
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search for Pokemon" onChange={this.handleInput.bind(this)} onKeyUp={this.handleKeyUp.bind(this)}/>
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={this.handleSearch.bind(this)}>Search</button>
          </div>
        </div>
        <h1>{mon.name}</h1>
        <img className={spriteClass} src={mon.sprites ? mon.sprites.front_default : ''} alt={mon.name}/>
        <h2>#{mon.id}</h2>
        <h2>
          <span className={className1}>{type1 ? type1 : 'Loading...'}</span>
          <span>{mon.types && mon.types[1] ? '  ' : ''}</span>
          <span className={className2}>{type2 ? type2 : ''}</span>
        </h2>
        <Stats stats={this.state.stats}/>
      </div>
    );
  }
}

export default Dex;
