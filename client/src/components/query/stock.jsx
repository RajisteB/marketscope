import React, { Component } from 'react';
import '../../css/query/Stock.css';
import {AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

class Stock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { chartData1d, chartData1m, chartData6m, chartData1y, company, mktData } = this.props;
    let exchange = null;
    
    if (mktData && company) {
      
      mktData.quote.primaryExchange === "New York Stock Exchange" ?
      exchange = "NYSE" : exchange = mktData.quote.primaryExchange.split(" ")[0];

      return (
        <div className="stock-container">
          <div className="summary">
            <div className="logo-container">
              <img src={mktData.logo.url} alt=""/>
            </div>
            <h1>{company.company.symbol}</h1>
            <h2>${parseFloat(mktData.price).toFixed(2)}</h2>
            <h4>{parseFloat(mktData.quote.changePercent).toFixed(2)}%</h4>
            <h6>{company.company.sector}</h6>
            <div className="trading-container">
              <button className="buy">BUY</button>
              <button className="sell">SELL</button>
            </div>
            <p>{company.company.description}</p>
          </div>
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
          <div className="chart">
            <div className="graph">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData1m}>
                  <XAxis 
                    dataKey="label"
                  />
                  <YAxis 
                    type="number"
                    domain={['auto', 'dataMax']}
                  />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="close" 
                    stroke="#4D3ED4"
                    fill="#4D3ED4"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="timeline">
              <button onClick={() => this.getChartDataTime('1d')}>
                <p>DAILY</p>
              </button>
              <button onClick={() => this.getChartDataTime('6m')}>
                <p>3 MONTHS</p>
              </button>
              <button onClick={() => this.getChartDataTime('3m')}>
                <p>6 MONTHS</p>
              </button>
              <button onClick={() => this.getChartDataTime('1y')}>
                <p>YEARLY</p>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="stock-container">
          <h1>Loading...</h1>
        </div>
      );
    }
  }
}

export default Stock;