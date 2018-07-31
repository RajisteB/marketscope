import React, { Component } from 'react';
import Summary from './summary.jsx';
import Financials from './financials.jsx';
import Chart from './chart.jsx';
import '../../css/query/Stock.css';

class Stock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { chartData1d, chartData1m, chartData6m, chartData1y, company, mktData, currentCash } = this.props;
    
    if (mktData && company) {

      return (
        <div className="stock-container">
          <Summary 
            mktData={mktData}
            company={company}
            currentCash={currentCash}
          />
          <Financials mktData={mktData} />
          <Chart 
            chartData1d={chartData1d}
            chartData1m={chartData1m}
            chartData6m={chartData6m}
            chartData1y={chartData1y}
          />
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