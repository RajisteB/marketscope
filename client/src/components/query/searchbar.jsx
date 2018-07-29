import React, { Component } from 'react';
import '../../css/query/Searchbar.css';
import Stock from './stock';
import axios from 'axios';

class Searchbar extends Component {
  constructor() {
    super();
    this.state = {
      input: "AAPL",
      mktData: "",
      chart1d: [],
      chart1m: [],
      chart6m: [],
      chart1y: [],
      company: "",
    }
  }

  getStockData = () => {
    axios.get(`/search/marketdata/${this.state.input}`)
      .then(res => {
        this.setState({
          mktData: res.data
        });
      })
      .catch(err => console.log(err));
  }

  getChartData = (symbol) => {
    axios.get(`/search/chart/${symbol}`)
      .then(res => {
        this.setState({
          chart1d: res.data.chart1d,
          chart1m: res.data.chart1m,
          chart6m: res.data.chart6m,
          chart1y: res.data.chart1y,
        });
      })
      .catch(err => console.log(err));
  }

  getStockData = (symbol) => {
    axios.get(`/search/marketdata/${symbol}`)
      .then(res => {
        this.setState({
          mktData: res.data,
          input: ""
        });
      })
      .catch(err => console.log(err));
  }

  getCompanyData = (symbol) => {
    axios.get(`/search/company/${symbol}`)
      .then(res => {
        this.setState({
          company: res.data
        });
        console.log(this.state.company);
      })
      .catch(err => console.log(err));
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value.toUpperCase()
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.getChartData(this.state.input)
    this.getStockData(this.state.input)
    this.getCompanyData(this.state.input)
    this.setState({
      input: ""
    });
  }

  componentDidMount() {
    this.getChartData(this.state.input);
    this.getStockData(this.state.input);
    this.getCompanyData(this.state.input);
  }

  render() {
    let { input, mktData, chart1d, chart1m, chart6m, chart1y, company } = this.state;
    return (
      <section>
        <div className="searchbar">
          <form 
            className="searchbar-container" 
            onSubmit={this.handleSubmit}
            >
            <input 
              type="text"
              value={input.toUpperCase()}
              placeholder="Search by Ticker..."
              onChange={this.handleChange}
            />
          </form>
        </div>
        <Stock 
          chartData1d={chart1d}
          chartData1m={chart1m}
          chartData6m={chart6m}
          chartData1y={chart1y}
          mktData={mktData}
          company={company}
        />
      </section>
    );
  }
  
}

export default Searchbar;
