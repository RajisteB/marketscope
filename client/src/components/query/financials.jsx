import React from 'react';

const Financials = (props) => {
  let { mktData } = props;
  let exchange = null;
  
  if (mktData) {
    mktData.co.exchange === "New York Stock Exchange" ?
    exchange = "NYSE" : exchange = mktData.co.exchange.split(" ")[0];

    return (
      <div className="financials">
        <p>{(exchange).toUpperCase()}</p>
        <p>AvgVol: <br/>{(mktData.quote.avgTotalVolume).toLocaleString()}</p>
        <p>CurrVol: <br/>{(mktData.quote.latestVolume).toLocaleString()}</p>
        <p>RVol: <br/>{parseFloat(mktData.quote.latestVolume / mktData.quote.avgTotalVolume).toFixed(2)}</p>
        <p>52wk Hi: <br/>{mktData.quote.week52High}</p>
        <p>52wk lo: <br/>{mktData.quote.week52Low}</p>
        <p>MktCap: <br/>{(mktData.quote.marketCap).toLocaleString()}</p>
        <p>YTD: <br/>{parseFloat(mktData.quote.ytdChange).toFixed(2)}%</p>
      </div>
    )
  } else {
    return (
      <div className="financials">
        <h2>Loading...</h2>
      </div>
    )
  }
}

export default Financials;