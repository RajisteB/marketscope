import React, { Component } from 'react';
import './css/App.css';
import Navbar from './components/navigation/navbar.jsx';

class App extends Component {
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
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
