import React from 'react';
import '../../css/overview/PortValue.css';
import Searchbar from './searchbar.jsx';
import MarketList from './marketlist.jsx';
import ActiveMarketList from './activemarketlist.jsx';

const PortfolioValue = (props) => {
  let { 
    pct, 
    change, 
    gainers,
    losers,
    active,
    dollars, 
    indicate 
  } = props;
  let mostActive = null;
  console.log("active: " + active);

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
        <div className="searchbar">
          <Searchbar />
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

export default PortfolioValue;