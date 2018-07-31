import React, { Component } from 'react';
import axios from 'axios';
import History from './history.jsx';
import Portfolio from './portfolio.jsx';
import '../../css/account/Account.css';


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trades: [],
      holdings: '',
      portfolio: '',
      currentPrices: [],
    }
  }

  getCurrentPrices = (symbols) => {
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=price`)
    .then(res => {
      this.setState({
        currentPrices: res.data
      });  
      this.getPortfolioPnL();
    })
    .catch(err => console.log(err));
  }

  getPortfolioPnL = () => {
    let { holdings, currentPrices } = this.state;
    
    holdings.map(held => {
      held.latest = currentPrices[`${held.symbol}`].price;
      held.total = (held.latest - held.price).toFixed(2);
      held.profits = (currentPrices[`${held.symbol}`].price * held.size) - (held.size * held.price);
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
        prices.push(stock.symbol);
      });

      this.setState({
        holdings: res.data,
        currentPrices: prices.join(','),
      });

      this.getCurrentPrices(this.state.currentPrices);
    })
    .catch(err => console.log(err));
  }

  getTrades = () => {
    axios.get('/trades')
    .then(res => {
      this.setState({
        trades: res.data.sort()
      });
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getTrades();
    this.getPortfolio();
  }


  render() {
    let { trades, portfolio, currentPrices } = this.state;
    
    return (
      <div className="tables-container">
        <div className="portfolio">
          <h3>PORTFOLIO</h3>
          <table className="portfolio-table" cellPadding="5">
            <tr>
              <th>Symbol</th>
              <th>Shares</th>
              <th>AvgPrice</th>
              <th>Change</th>
              <th>Total</th>
            </tr>
            <Portfolio holdings={portfolio} />
          </table>
        </div>
        <div className="history">
          <h3>TRADE HISTORY</h3>
          <table className="trade-history-table" cellPadding="5">
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Amt</th>
              <th>Order</th>
              <th>Exchange</th>
            </tr>
            <History trades={trades} />
          </table>
        </div>
      </div>
    )
  }
}


export default Account