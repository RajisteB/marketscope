import React from 'react';
import {AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';

const Chart = (props) => {
  let { chartData1d, chartData1m, chartData6m, chartData1y } = props;

  if (chartData1m) {
    return (
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
    )
  } else {
    <div className="chart">
      <h2>Loading...</h2>
    </div>
  }
}

export default Chart;