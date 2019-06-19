import React from 'react';
import TradeModal from './trademodal.jsx';
import '../../css/query/Summary.css';
import _ from 'underscore.string';

const Summary = (props) => {
  let { mktData, company, currentCash, contains, containSize, executed, refresh } = props;
  let described = _(company.company.description).truncate(50);

  if (mktData && company) {
    return (
      <div className="summary">
        <h1>{company.company.symbol}</h1>
        <h2>${parseFloat(mktData.price).toFixed(2)}</h2>
        <h4>{parseFloat(mktData.quote.changePercent).toFixed(2)}%</h4>
        <h6>{company.company.sector}</h6>
        <TradeModal 
          company={company} 
          mktData={mktData} 
          currentCash={currentCash}
          contains={contains}
          containSize={containSize}
          executed={executed}
          refresh={refresh}
        />
        <p>{described._wrapped}</p>
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