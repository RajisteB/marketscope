import React, { Component } from 'react';
import {AreaChart, Area, XAxis, YAxis, ResponsiveContainer} from 'recharts';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartTime: [],
      dataLoaded: false
    }
  }

  getChartDataTime = (time) => {
    this.setState({
      chartTime: time,
      dataLoaded: true
    })
  }

  render() {
    let { chartData1d, chartData1m, chartData6m, chartData1y } = this.props;
    let { chartTime, dataLoaded } = this.state;
    let timeline = null;
    dataLoaded ? timeline = chartTime : timeline = chartData1m;
  
    if (chartData1m) {
      
      return (
        <div className="chart">
          <div className="graph">
            <ResponsiveContainer width="100%" height="100%" >
              <AreaChart data={timeline} >
                <defs>
                  <linearGradient id="colorData" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5C00" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF5C00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="label"
                  axisLine={false}
                />
                <YAxis 
                  type="number"
                  axisLine={false}
                  orientation="right"
                  allowDecimals={false}
                  domain={['auto', 'dataMax']}
                  label={{fill: 'tomato'}}
                  width={50}
                />
                <Area 
                  type="basis" 
                  dataKey="close" 
                  stroke="#FF5C00"
                  fillOpacity={0.05}
                  fill="url(#colorData)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="timeline">
            <button onClick={() => this.getChartDataTime(chartData1d)}>
              <p>1D</p>
            </button>
            <button onClick={() => this.getChartDataTime(chartData1m)}>
              <p>3MOS</p>
            </button>
            <button onClick={() => this.getChartDataTime(chartData6m)}>
              <p>6MOS</p>
            </button>
            <button onClick={() => this.getChartDataTime(chartData1y)}>
              <p>YR</p>
            </button>
          </div>
        </div>
      )
    } else {
      return (
        <div className="chart">
          <h2>Loading...</h2>
        </div>
      )
    }

  }
}

export default Chart;