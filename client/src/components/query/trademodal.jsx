import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
// import axios from 'axios';

class TradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      size: '',
      cost: 0,
      buy: false,
      sell: false,
    }
  }

  toggleModalBuy = () => {
    this.setState({
      open: !this.state.open,
      buy: !this.state.buy
    })
  }

  toggleModalSell = () => {
    this.setState({
      open: !this.state.open,
      sell: !this.state.sell,
    })
  }

  toggleModalClose = () => {
    this.setState({
      open: !this.state.open,
      size: '',
      cost: 0,
      buy: false,
      sell: false,
    })
  }

  calculateSizeChange = (price, e) => {
    this.setState({
      size: e.target.value,
      cost: e.target.value * price
    });
    console.log(this.state.size);
  }

  render() {
    let { company, mktData } = this.props;
    let { open, size, buy, sell } = this.state;
    let side = null;

    buy ? side = <option value="BOT">BUY</option> : null;
    sell ? side = <option value="SLD">SELL</option> : null;

    return (
      <div className="trading-container">
        <button className="buy" onClick={this.toggleModalBuy}>BUY</button>
        <button className="sell" onClick={this.toggleModalSell}>SELL</button>
        <Modal open={open}>
          <div className="modal-window">
            <div className="trade-form">
              <form action="">
                <div className="trade-position">
                  <p>Position:</p><br/>
                  <select disabled name="positions" id="">
                    {side}
                  </select>
                </div>
                <div className="trade-symbol">
                  <p>Symbol:</p><br/>
                  <span>{company.company.symbol}</span>
                </div>
                <div className="trade-size">
                  <p>Size:</p><br/>
                  <input 
                    type="number"
                    id="trade-size-select" 
                    onChange={(e) => this.calculateSizeChange(mktData.price, e)}
                    value={size}
                  />
                </div>
                <div className="trade-price">
                  <p>Price:</p><br/>
                  <span>${mktData.price}</span>
                </div>
                <div className="trade-validate">
                  <p>Cost:</p><br/>
                  <span>
                    {parseFloat(this.state.cost).toLocaleString('en-us', {style: 'currency', currency: 'USD', maximumFractionDigits : 2, minimumFractionDigits : 2})}
                  </span>
                </div>
              </form>
            </div>
            <br/>
            <div className="actions">
              <button onClick={this.toggleModalClose}>
                Cancel
              </button>
              <button onClick={this.toggleModal}>
                Execute
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default TradeModal;