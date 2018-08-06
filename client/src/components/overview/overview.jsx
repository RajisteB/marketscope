import React, { Component } from 'react';
import '../../css/overview/Overview.css';
import MarketList from './marketlist.jsx';
import ActiveMarketList from './activemarketlist.jsx';
import axios from 'axios';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      currentCash: null,
      symbols: '',
      portfolio: null,
      portTotal: 1000000,
      prices: null,
      pctChg: 0.00,
      gainers: null,
      losers: null,
      active: null,
    }
  }

  getPortfolio = () => {
    axios.get('/portfolio')
    .then(res => {
      let symbolAry = [];

      res.data.map(stock => {
        return symbolAry.push(stock.symbol);
      })
      this.setState({
        portfolio: res.data,
        symbols: symbolAry.join(','),
      });
      this.getPrices(this.state.symbols)
    })
    .catch(err => console.log(err));
  }

  getPrices = (symbols) => {
    if (symbols !== '') {
      axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=price`)
      .then(res => {
        this.setState({
          prices: res.data
        });
        this.getCurrentCash();
      })
      .catch(err => console.log(err));
    } else {
      return;
    }
  }
  
  getCurrentCash = () => {
    axios.get('/cash')
    .then(res => {
      let totalCash = res.data[0].current;
      this.setState({
        currentCash: totalCash,
        });
        this.getTotalCash();
      })
      .catch(err => console.log(err));
    }

  getTotalCash = () => {
    let { currentCash, prices, portfolio } = this.state;
    let portTotal = 0;
    let pctChg = 0;
    let initial = 1000000;

    portfolio.map(stock => {
      stock.latest = prices[`${stock.symbol}`].price;
      return portTotal += (stock.latest * stock.size);
    });

    pctChg = ((((currentCash + portTotal) - initial) / initial) * 100).toFixed(2)

    this.setState({
      portTotal: currentCash + portTotal,
      pctChg,
    })
  }

  getMarketLists = () => {
    axios.get('/search/tops')
      .then(res => {
        let list = res.data;

        this.setState({
          gainers: list.topGainers,
          losers: list.topLosers,
          active: list.topActives
        })
      })
      .catch(err => console.log(err));
  }

  componentDidMount(){
    this.getPortfolio();
    this.getMarketLists();
  }

  componentDidUpdate(prevState) {
    if (this.state.portTotal !== prevState.portTotal) {
      this.getPortfolio();
    }
  }

  render() {
    let { 
      portTotal, 
      pctChg,
      gainers,
      losers,
      active 
    } = this.state;

    let pct,
        cash,
        indicate,
        change,
        dollars = null;

    cash = parseInt(portTotal).toLocaleString('en-us', {style: 'currency', currency: 'USD', maximumFractionDigits : 2, minimumFractionDigits : 2});

    dollars = cash.split('.')[0];
    change = cash.split('.')[1];

    if (pctChg >= 0 ) {
      pct = `+${pctChg}`;
      indicate = "#22CF15"
    } else {
      indicate = "red";
    }

    let mostActive = null;

    if (active) {
      
      if (active.length === 0 ) {
        mostActive = (
          <ActiveMarketList 
            list={active}
            name={"Active"}
            changeColor={"lightpurple"}
            dataLoaded={false}
            sign={""}
          />
        )
      } else {
        mostActive = (
          <ActiveMarketList 
            list={active}
            name={"Actives"}
            changeColor={"lightpurple"}
            dataLoaded={true}
            sign={""}
          />
        )
      } 
    }
    

    return (
      <main>
        <div className="portfolio-value">
          <h4>PORTFOLIO VALUE</h4>
          <div className="amount">
            <h1>{dollars}.</h1>
            <span>{change}</span>
          </div>
          <h5 style={{ color: indicate }}>{pct}%</h5>
        </div>
        <div className="list gainers">
          <MarketList 
            list={gainers}
            name={"Gainers"}
            changeColor={"limegreen"}
            dataLoaded={true}
            sign={"+"}
          />
        </div>
        <div className="list losers">
          <MarketList 
            list={losers}
            name={"Losers"}
            changeColor={"tomato"}
            dataLoaded={true}
            sign={""}
          />
        </div>
        <div className="list actives">
          {mostActive}
        </div>
      </main>
    );
  }
}

export default Overview;