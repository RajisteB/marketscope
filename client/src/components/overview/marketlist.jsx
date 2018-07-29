import React from 'react';
import '../../css/overview/MarketList.css';

const MarketList = (props) => {
  let { list, name, changeColor, sign } = props;
  
  if (list) {
    return (
      <div className="list-container">
        <h3>Top {name}</h3>
        <hr/>
        <div className="item-container">
          {
            list.map((sym, idx) => {
              return (
                <div className="item" key={idx} style={{ color: `${changeColor}`}}> 
                  <h4>{sym.symbol}</h4>
                  <h5>{sign}{parseFloat(sym.change).toFixed(2)}</h5>
                  <h6>{parseFloat(sym.changePercent).toFixed(2)}%</h6>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }
}

export default MarketList;