import React from 'react';
import '../../css/overview/MarketList.css';

const ActiveMarketList = (props) => {
  let { list, name, changeColor, sign, dataLoaded } = props;
  let style = null;

  if (list && dataLoaded) {
    return (
      <div className="list-container">
        <h3>Top {name}</h3>
        <hr/>
        <div className="item-container">
          {
            list.map((sym, idx) => {
              sym.change >= 0 ? style = { color: '#22CF15'} : style = { color: 'tomato'};
              return (
                <div className="item" key={idx} style={{ color: `${changeColor}`}}> 
                  <h4>{sym.symbol}</h4>
                  <h5 style={style}>{sign}{parseFloat(sym.change).toFixed(2)}</h5>
                  <h6 style={style}>{parseFloat(sym.changePercent).toFixed(2)}%</h6>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className="list-container">
        <h3>Top {name}</h3>
        <hr/>
        <div className="item-container">
          <h4 style={{ color: '#FF5C00' }}>Market is Closed...</h4>
        </div>
      </div>
    )
  }
}

export default ActiveMarketList;