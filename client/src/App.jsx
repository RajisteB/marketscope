import React, { Component } from 'react';
import './css/App.css';
import Navbar from './components/navigation/navbar.jsx';
import Overview from './components/overview/overview.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="layout">
          <div className="dashboard">
            <div className="dash-col-01">
              <Overview />
            </div>
            <div className="dash-col-02"></div>
            <div className="dash-col-03"></div>
          </div>
          <div className="footer"></div>
        </div>
      </div>
    );
  }
}

export default App;
