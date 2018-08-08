import React, { Component } from 'react';
import './css/App.css';
import axios from 'axios';
import Navbar from './components/navigation/navbar.jsx';
import Searchbar from './components/query/searchbar.jsx';
import Overview from './components/overview/overview.jsx';
import Account from './components/account/account.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      trades: [],
      holdings: '',
      portfolio: '',
      currentPrices: [],
    }
  }

  getTrades = () => {
    axios.get('/trades')
    .then(res => {
      this.setState({
        trades: res.data.reverse() 
      });
    })
    .catch(err => console.log(err));
  }

  getCurrentPrices = (symbols) => {
    if (symbols !== '') {
      axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=price`)
      .then(res => {
        this.setState({
          currentPrices: res.data
        });  
        this.getPortfolioPnL();
      })
      .catch(err => console.log(err));
    } else {
      return;
    }
  }

  getPortfolioPnL = () => {
    let { holdings, currentPrices } = this.state;
    
    holdings.map(held => {
      held.latest = currentPrices[`${held.symbol}`].price;
      held.total = (held.latest - held.price).toFixed(2);
      held.profits = (held.latest * held.size) - (held.size * held.price);
      return holdings;
    });
    
    this.setState({
      portfolio: holdings
    })
  }

  getPortfolio = () => {
    axios.get('/portfolio')
    .then(res => {
      let prices = [];
      res.data.map(stock => {
        return prices.push(stock.symbol);
      });

      this.setState({
        holdings: res.data,
        currentPrices: prices.join(','),
      });

      this.getCurrentPrices(this.state.currentPrices);
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getTrades();
    this.getPortfolio();
  }

  render() {
    let { trades, portfolio } = this.state;

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
              <Searchbar executed={this.getTrades} refresh={this.getPortfolio}/>
            </div>
            <div className="dash-col-03">
              <Account trades={trades} portfolio={portfolio}/>
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    );
  }
}

export default App;
