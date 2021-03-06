import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';

class TradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      size: 0,
      cost: 0,
      buy: false,
      sell: false,
      order: '',
      executing: false,
      sequence: 'Execute',
      icon: false,
      disabled: false,
    }
  }

  toggleModalBuy = () => {
    this.setState({
      open: !this.state.open,
      buy: !this.state.buy
    });
  }

  toggleModalSell = () => {
    this.setState({
      open: !this.state.open,
      sell: !this.state.sell,
    })
  }

  toggleModalClose = () => {
    // e.preventDefault();
    this.setState({
      open: !this.state.open,
      size: '',
      cost: 0,
      buy: false,
      sell: false,
      sequence: 'Execute',
      disabled: false,
    })
  }

  calculateSizeChange = (price, e) => {
    this.setState({
      size: e.target.value,
      cost: e.target.value * price
    });
  }


  handleTrade = async (str, e) => {
    await e.preventDefault();
    await this.setState({ 
      order: str, 
      executing: true,
    });

    if (this.props.contains) {
      await axios.put('/portfolio/update', {
        symbol: this.props.mktData.quote.symbol,
        size: parseFloat(this.state.size),
        price: parseFloat(this.props.mktData.price),
        order: this.state.order,
        value: parseFloat(this.state.cost)
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    } else {
      await axios.post('/portfolio/add', {
        symbol: this.props.mktData.quote.symbol,
        size: parseFloat(this.state.size),
        price: parseFloat(this.props.mktData.price),
        order: this.state.order,
        value: parseFloat(this.state.cost)
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    }
    await this.setState({ 
      executed: false,
    });
    // await window.location.reload();
    await this.props.executed();
    await this.props.refresh();
  }

  initExecution = () => {
    this.setState({
      sequence: "Executing...",
      icon: true,
      disabled: true,
    })
  }

  finishExecution = () => {
    this.setState({
      sequence: "Completed!",
      icon: false,
    })
  }

  executeTradeButtonUI= async () => {
    await this.initExecution();
    await setTimeout(() => {
      this.finishExecution();
    }, 4000)
    await setTimeout((e) => {
      this.toggleModalClose(e);
    }, 5000)
  }

  

  render() {
    let { contains, containSize, company, mktData, currentCash } = this.props;
    let { open, size, buy, sell, cost, order, sequence, disabled } = this.state;
    let side = null;
    let validateCost = null;
    let style = null;

    style = disabled ? { opacity: 0.3 } : null;

    // if portfolio already contains this stock and share size is > 0 i.e "long"
    if (contains && containSize > 0) {
      side = buy ? "BOT" : 
      side = sell ? "SLD" : 
      null;
    // else if portfolio already contains this stock and share size is < 0 i.e "short"
    } else if(contains && containSize < 0) {
      side = buy ? "COVER" : 
      side = sell ? "SHRT" : 
      null;
    // default if this stock is not already held in portfolio
    } else {
      side = buy ? "BOT" : 
      side = sell ? "SHRT" : 
      null;
    }

    // validation conditions for button UI and trade data
    validateCost = cost > currentCash ? 
      (
        <div className="actions">
          <button type="button" onClick={(e) => this.toggleModalClose(e)}>
            Cancel
          </button>
          <button type="submit" disabled className="disabled">
            {sequence}
          </button>
          <p style={{color: 'red'}}>Please enter a smaller size.</p>
        </div>
      ) :
      size <= 0 || size === '' ? 
      (
        <div className="actions">
          <button type="button" onClick={(e) => this.toggleModalClose(e)}>
            Cancel
          </button>
          <button type="submit" disabled className="disabled">
            {sequence}
          </button>
          <p style={{color: 'red'}}>Please enter a share size.</p>
        </div>
      ) :
        (
        <div className="actions">
          <button disabled={disabled} style={style} type="button" onClick={(e) => this.toggleModalClose(e)}>
            Cancel
          </button>
          <button type="submit" onClick={this.executeTradeButtonUI}>
            {sequence}
          </button>
          <p></p>
        </div>
      );

    return (
      <div className="trading-container">
        <button type="button" className="buy" onClick={this.toggleModalBuy}>BUY</button>
        <button type="button" className="sell" onClick={this.toggleModalSell}>SELL</button>
        <Modal open={open}>
          <div className="modal-window">
            <div className="trade-form">
              <form onSubmit={(e) => this.handleTrade(side, e)}>
                <div className="trade-position">
                  <p>Position:</p><br/>
                  <select 
                    readOnly 
                    value={order} 
                    name="order"
                  >
                    <option value={side}>{side}</option>
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
                  <p>Total:</p><br/>
                  <span>
                    {parseFloat(this.state.cost).toLocaleString('en-us', {style: 'currency', currency: 'USD', maximumFractionDigits : 2, minimumFractionDigits : 2})}
                  </span>
                </div>
                <br/>
                {validateCost}
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default TradeModal;