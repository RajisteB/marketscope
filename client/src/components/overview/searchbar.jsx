import React, { Component } from 'react';
import '../../css/overview/Searchbar.css';
import axios from 'axios';

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      input: null,

    }
  }


  render() {
    return (
      <div className="searchbar-container">
        <input 
          type="text"
          placeholder="Search by Ticker..."
        />
      </div>
    );
  }
}

export default Searchbar;