import React, { Component } from 'react';
import Stats from './Stats';

class SelectedMon extends Component {
  render() {
    let mon = this.props.mon;
    let type1 = undefined;
    let type2 = undefined;
    let className1 = "typing";
    let className2 = "";
    let spriteClass = "sprite";

    if(mon.types) {
      type1 = mon.types[0].type.name;
      className1 += " " + type1;
      spriteClass += " " + type1;
      if(mon.types[1]){
        type2 = mon.types[1].type.name;
        className2 += "typing " + type2;
      }
    }

    return(
      <div>
        <h1>{mon.name}</h1>
        <img className={spriteClass} src={mon.sprites ? mon.sprites.front_default : ''} alt={mon.name}/>
        <h2>#{mon.id}</h2>
        <h2>
          <span className={className1}>{type1 ? type1 : 'Loading...'}</span>
          <span>{mon.types && mon.types[1] ? '  ' : ''}</span>
          <span className={className2}>{type2 ? type2 : ''}</span>
        </h2>
        <Stats stats={this.props.stats}/>
      </div>
    );
  }
}

export default SelectedMon;
