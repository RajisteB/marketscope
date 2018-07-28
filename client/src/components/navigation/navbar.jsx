import React, { Component } from 'react';
import '../../css/navigation/Navigation.css';
import Logo from '../../images/Logo.png';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      hidden: true,
    }
  }

  showSidebar = () => {
    this.setState({
      hidden: !this.state.hidden
    })
  }


  render() {
    let { hidden } = this.state;
    let toggleSidebar = null;

    hidden ? toggleSidebar = "sidebar-hide" :
    toggleSidebar = "sidebar-show";

    return (
      <div className="nav-container">
        <div className="nav">
          <i 
            class="fab fa-buromobelexperte fa-3x" 
            onClick={this.showSidebar}
          ></i>
          <div className="nav-logo">
            <img src={Logo} alt=""/>arketscope
          </div>
          <div className="welcome">
            <h4>Welcome back Warren</h4>
            <div className="avatar"></div>
          </div>
        </div>
        <div className={`sidebar ${toggleSidebar}`}>
          <div className="side-menu ">
            <div className="side-menu-container">
              <i 
                class="fas fa-times-circle fa-2x" 
                id="menu-exit"
                onClick={this.showSidebar}
              ></i>
              <img src={Logo} alt=""/>
              <h1>MARKETSCOPE</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
