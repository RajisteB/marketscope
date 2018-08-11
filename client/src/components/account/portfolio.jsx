import React, { Component } from 'react'

class Portfolio extends Component {
  constructor(props){
    super(props);
    this.state = {
      prices: [],
    }
  }

  render() {
    let { holdings } = this.props;
    let colorChg = null;

    if (holdings) {
      return (
        holdings.map((held, idx) => {
          held.total >= 0? colorChg = "limegreen" : colorChg = "tomato";
          return (
            <tr key={idx} className="portfolio-rows">
              <td id="port-symbol">{held.symbol}</td>
              <td>{held.size}</td>
              <td>${held.price.toFixed(2)}</td>
              <td style={{color: colorChg}}>{held.total}</td>
              <td style={{color: colorChg}}>
                {
                  (held.profits).toLocaleString('en-us', {style: 'currency', currency: 'USD', maximumFractionDigits : 2, minimumFractionDigits : 2})
                }
              </td>
            </tr>
          )
        })
      );
    } else {
      return (
        <tr className="load">
          <td>Loading...</td>
        </tr>
      )
    }
  }

}

export default Portfolio;