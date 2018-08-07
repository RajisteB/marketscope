import React from 'react'

const History = (props) => {
  let { trades, changed } = props;

  return (
    trades.map((trade, idx) => {
      return (
        <tr className="history-row" key={idx} onClick={changed}>
          <td>{trade.date}</td>
          <td>{trade.symbol}</td>
          <td>{trade.price}</td>
          <td>{trade.size}</td>
          <td>{trade.order}</td>
          <td>IEX</td>
        </tr>
      )
    })
  )
}

export default History