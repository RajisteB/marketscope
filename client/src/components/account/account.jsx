import React from 'react';
import History from './history.jsx';
import Portfolio from './portfolio.jsx';
import '../../css/account/Account.css';


const Account = (props) => {
  let { trades, portfolio } = props;
  
  return (
    <div className="tables-container">
      <div className="portfolio">
        <h3>PORTFOLIO</h3>
        <table className="portfolio-table" cellPadding="5">
          <tbody>
            <tr>
              <th>Symbol</th>
              <th>Shares</th>
              <th>AvgPrice</th>
              <th>Change</th>
              <th>Total</th>
            </tr>
            <Portfolio holdings={portfolio} />
          </tbody>
        </table>
      </div>
      <div className="history">
        <h3>TRADE HISTORY</h3>
        <table className="trade-history-table" cellPadding="5">
          <tbody>
            <tr>
              <th>Date</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Amt</th>
              <th>Order</th>
              <th>Exchange</th>
            </tr>
            <History trades={trades} changed={this.testUpdates}/>
          </tbody>
        </table>
      </div>
    </div>
  )
}


export default Account