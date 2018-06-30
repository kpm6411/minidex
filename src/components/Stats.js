import React, { Component } from 'react';

class Stats extends Component {
  render() {
    let stats = this.props.stats;

    if(this.props.loaded){
      return (
        <ul className="stat-list">
          <li>
            <h4>HP:</h4>
            <div className="stat-bar bar-backer">
              <div className="stat-fill fire" style={{width: stats[0] + 'px'}}><p>{stats[0]}</p></div>
            </div>
          </li>
          <li>
            <h4>Atk:</h4>
            <div className="stat-bar bar-backer">
              <div className="stat-fill fighting" style={{width: stats[1] + 'px'}}><p>{stats[1]}</p></div>
            </div>
          </li>
          <li>
            <h4>Def:</h4>
            <div className="stat-bar bar-backer">
              <div className="stat-fill electric" style={{width: stats[2] + 'px'}}><p>{stats[2]}</p></div>
            </div>
          </li>
          <li>
            <h4>SAtk:</h4>
            <div className="stat-bar bar-backer">
              <div className="stat-fill water" style={{width: stats[3] + 'px'}}><p>{stats[3]}</p></div>
            </div>
          </li>
          <li>
            <h4>SDef:</h4>
            <div className="stat-bar bar-backer">
              <div className="stat-fill grass" style={{width: stats[4] + 'px'}}><p>{stats[4]}</p></div>
            </div>
          </li>
          <li>
            <h4>Spd:</h4>
            <div className="stat-bar bar-backer">
              <div className="stat-fill psychic" style={{width: stats[5] + 'px'}}><p>{stats[5]}</p></div>
            </div>
          </li>
        </ul>
      )} else {
        return <div></div>;
      }
  }

}



export default Stats;
