import React, { Component } from 'react';
import axios from 'axios';
import History from './history.jsx';
import '../../css/account/Account.css';


class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trades: [],
      portfolio: ''
    }
  }

  getTrades = () => {
    axios.get('/trades')
    .then(res => {
      console.log(res);
      this.setState({
        trades: res.data.sort()
      })
    });
  }

  componentDidMount() {
    this.getTrades();
  }


  render() {
    let { trades, portfolio } = this.state;
    // console.log(typeof trades)
    return (
      <div className="tables-container">
        <div className="portfolio">
          <h3>PORTFOLIO</h3>
          <table className="portfolio-table" cellPadding="5">
            <tr>
              <th>Symbol</th>
              <th>Shares</th>
              <th>Price</th>
              <th>Change</th>
              <th>Trade</th>
            </tr>
            <tr>
              <td id="port-symbol">NFLX</td>
              <td>400</td>
              <td>$312.50</td>
              <td>3.25</td>
              <td>
                <button className="table-btn">
                  <p>TRADE</p>
                </button>
              </td>
            </tr>
          </table>
        </div>
        <div className="history">
          <h3>TRADE HISTORY</h3>
          <table className="trade-history-table" cellPadding="5">
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Amt</th>
              <th>Order</th>
              <th>Exchange</th>
            </tr>
            <History trades={trades} />
          </table>
        </div>
      </div>
    )
  }
}


export default Account