import React, { Component } from 'react';
import './css/App.css';
import Navbar from './components/navigation/navbar.jsx';
import Searchbar from './components/query/searchbar.jsx';
import Overview from './components/overview/overview.jsx';
import Account from './components/account/account.jsx';
import Footer from './components/footer/footer.jsx';

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
              <div className="overview-container">
                <Overview />
              </div>
            </div>
            <div className="dash-col-02">
              <Searchbar />
            </div>
            <div className="dash-col-03">
              <Account />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
