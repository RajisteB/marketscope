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