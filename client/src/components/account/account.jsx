import React, { Component } from 'react';
import axios from 'axios';
import '../../css/account/Account.css';


class Account extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
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
              <td>NFLX</td>
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
              <th>Pos</th>
              <th>Amt</th>
              <th>Order</th>
              <th>Exchange</th>
            </tr>
            <tr className="history-row">
              <td>03-06-18Z14:22pm</td>
              <td>NFLX</td>
              <td>BOT</td>
              <td>300</td>
              <td>MKT</td>
              <td>IEX</td>
            </tr>
          </table>
        </div>
      </div>
    )
  }
}


export default Account