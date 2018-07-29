import React, { Component } from 'react';
import '../../css/overview/Overview.css';
import PortfolioValue from './portvalue.jsx';
import axios from 'axios';

class Overview extends Component {
  constructor() {
    super();
    this.state = {
      currentCash: null,
      pctChg: null,
      gainers: null,
      losers: null,
      active: null,
    }
  }

  getCurrentCash = () => {
    axios.get('/cash')
      .then(res => {
        let totalCash = res.data[0].current;
        let initial = res.data[0].initial;
        let pct = ((totalCash - initial) / initial) * 100;
        this.setState({
          currentCash: totalCash,
          pctChg: pct.toFixed(2)
        })
      })
      .catch(err => console.log(err));
  }

  getMarketLists = () => {
    axios.get('/search/tops')
      .then(res => {
        let list = res.data;
        console.log(list);
        this.setState({
          gainers: list.topGainers,
          losers: list.topLosers,
          active: list.topActives
        })
      })
      .catch(err => console.log(err));
  }

  componentDidMount(){
    this.getCurrentCash();
    this.getMarketLists();
  }

  render() {
    let { 
      currentCash, 
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

    cash = parseInt(currentCash).toLocaleString('en-us', {style: 'currency', currency: 'USD', maximumFractionDigits : 2, minimumFractionDigits : 2});

    dollars = cash.split('.')[0];
    change = cash.split('.')[1];

    if (pctChg >= 0 ) {
      pct = `+${pctChg}`;
      indicate = "#22CF15"
    } else {
      indicate = "red";
    }

    let style = {
      color: indicate
    }
    

    return (
      <div className="overview-container">
        <PortfolioValue 
          pct={pct}
          change={change}
          dollars={dollars}
          indicate={indicate}
          gainers={gainers}
          losers={losers}
          active={active}
        />
      </div>
    );
  }
}

export default Overview;