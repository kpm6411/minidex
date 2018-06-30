import React, { Component } from 'react';
import Stats from './Stats';

class SelectedMon extends Component {
  capitalize(str) {
    if(str){
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }

  render() {
    let mon = this.props.mon;
    let type1 = undefined;
    let type2 = undefined;
    let className1 = "typing";
    let className2 = "";
    let spriteClass = "sprite";
    let flavor = [{ text: "" }];
    let loaded = false;
    let monNumber = "";

    if(mon.types) {
      loaded = true;
      monNumber = "#" + mon.id;
      type1 = mon.types[0].type.name;
      className1 += " " + type1;
      spriteClass += " " + type1;
      flavor = [];
      mon.species.flavor_text_entries.forEach((i) => {
        if(i.language.name === "en"){
          flavor.unshift({
            version: i.version.name,
            text: i.flavor_text
          });
        }
      });
      if(mon.types[1]){
        type2 = mon.types[1].type.name;
        className2 += "typing " + type2;
      }
    }

    let flavorBox = flavor.map((entry) => {
      if(entry.version){
        let text = entry.text.replace('\n', ' ');
        text = text.replace('\u000c', ' ');
        return(
          <li className="flavor-entry">
            <b><u>{entry.version.toUpperCase().replace('-', ' ')}</u>: </b>
            {text}
          </li>
        );
      } else {
        return <li style={{listStyleType:"none"}}></li>;
      }
    });

    return(
      <div>
        <h1>{this.capitalize(mon.name)}</h1>
        <img className={spriteClass} src={mon.sprites ? mon.sprites.front_default : ''} alt={mon.name}/>
        <h2>{monNumber}</h2>
        <h2>
          <span className={className1}>{type1 ? this.capitalize(type1) : 'Loading...'}</span>
          <span>{mon.types && mon.types[1] ? '  ' : ''}</span>
          <span className={className2}>{type2 ? this.capitalize(type2) : ''}</span>
        </h2>
        <Stats stats={this.props.stats} loaded={loaded}/>
        <ul>{flavorBox}</ul>
      </div>
    );
  }
}

export default SelectedMon;
