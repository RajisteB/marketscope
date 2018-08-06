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
      currentCash: 0,
      contains: null,
      containSize: 0,
    }
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
      .catch(err => console.log(err.response));
  }

  getStockData = (symbol) => {
    axios.get(`/search/marketdata/${symbol}`)
      .then(res => {
        this.setState({
          mktData: res.data,
          input: ""
        });
      })
      .catch(err => console.log(err.response));
  }

  getCompanyData = (symbol) => {
    axios.get(`/search/company/${symbol}`)
      .then(res => {
        console.log(res);
        this.setState({
          company: res.data
        });
      })
      .catch(err => console.log(err.response));
  }

  getPortfolioData = () => {
    axios.get('/cash/')
    .then(res => {
      let current = res.data[0].current;
      this.setState({
        currentCash: current
      });
    })
    .catch(err => console.log(err.response));
  }

  getPortfolioHoldings = (symbol) => {
    let symbolAry = [];
    let containSymbol = null;
    let getSymbolObj = null;
    let symbolSize = 0;
    axios.get('/portfolio')
    .then(res => {
      console.log(res);
      if (res.data) {
        // map results array to fill symbol array with currently held stocks
        res.data.map(stock => {
          return symbolAry.push(stock.symbol);
        })
        containSymbol = symbolAry.includes(symbol);
        // if the current portfolio already contains this symbol
        if (containSymbol) {
          getSymbolObj = res.data.filter(stock => {
            return stock.symbol === symbol;
          });
        // assign the current share size of said symbol
          symbolSize = getSymbolObj[0].size
        } else {
        // else the symbol size is defaulted to 0
          symbolSize = 0;
        }
        
        this.setState({
          contains: containSymbol,
          containSize: symbolSize
        });
      } else {
        return;
      }
    })
    .catch(err => console.log(err.response));
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value.toUpperCase()
    });
  }

  handleSequence = async(symbol) => {
    await this.getPortfolioHoldings(symbol);
    await this.getChartData(symbol);
    await this.getStockData(symbol);
    await this.getCompanyData(symbol);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("running submit...");
    this.handleSequence(this.state.input);
    console.log(this.state.input);
    this.setState({
      input: ""
    });
  }

  componentDidMount() {
    this.handleSequence(this.state.input);
    this.getPortfolioData();
  }

  render() {
    let { input, mktData, chart1d, chart1m, chart6m, chart1y, company, currentCash, contains, containSize } = this.state;

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
          currentCash={currentCash}
          contains={contains}
          containSize={containSize}
        />
      </section>
    );
  }
  
}

export default Searchbar;
