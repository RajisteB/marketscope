import React from 'react';
import TradeModal from './trademodal.jsx';
import '../../css/query/Summary.css';

const Summary = (props) => {
  let { mktData, company } = props;

  if (mktData, company) {
    return (
      <div className="summary">
        <div className="logo-container">
          <img src={mktData.logo.url} alt=""/>
        </div>
        <h1>{company.company.symbol}</h1>
        <h2>${parseFloat(mktData.price).toFixed(2)}</h2>
        <h4>{parseFloat(mktData.quote.changePercent).toFixed(2)}%</h4>
        <h6>{company.company.sector}</h6>
        <TradeModal 
          company={company} 
          mktData={mktData} 
        />
        <p>{company.company.description}</p>
      </div>
    )
  } else {
    return (
      <div className="summary">
        <h2>Loading...</h2>
      </div>
    )
  }
}

export default Summary;