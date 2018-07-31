import React from 'react'

const History = (props) => {
  let { trades } = props;

  return (
    trades.map(trade => {
      return (
        <tr className="history-row">
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