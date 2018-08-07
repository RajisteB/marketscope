import React from 'react';
import Summary from './summary.jsx';
import Financials from './financials.jsx';
import Chart from './chart.jsx';
import '../../css/query/Stock.css';

const Stock = (props) => {
  let { chartData1d, chartData1m, chartData6m, chartData1y, company, mktData, currentCash, contains, containSize, executed, refresh } = props;
  
  if (mktData && company) {

    return (
      <div className="stock-container">
        <Summary 
          mktData={mktData}
          company={company}
          currentCash={currentCash}
          contains={contains}
          containSize={containSize}
          executed={executed}
          refresh={refresh}
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

export default Stock;