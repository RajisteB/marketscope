import React, { Component } from 'react';
import './css/App.css';
import axios from 'axios';
import Navbar from './components/navigation/navbar.jsx';
import Searchbar from './components/query/searchbar.jsx';
import Overview from './components/overview/overview.jsx';
import Account from './components/account/account.jsx';
import Footer from './components/footer/footer.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      trades: []
    }
  }

  getTrades = () => {
    console.log("In [App.jsx] getTrades func");
    axios.get('/trades')
    .then(res => {
      console.log(res.data);
      this.setState({
        trades: res.data.reverse() 
      });
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getTrades();
  }

  render() {
    let { trades } = this.state;

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
              <Searchbar executed={this.getTrades}/>
            </div>
            <div className="dash-col-03">
              <Account trades={trades} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
