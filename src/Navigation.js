import React, { Component } from 'react';
import logo from './logo.svg';
import './navigation.css';
import classNames from 'classnames';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }
  _onNavClick(e) {
    e.preventDefault();
    this.setState({
      open: !this.state.open
    }, () => {
      console.log(this.state.open);
    });
  }

  render() {
    return (
      <div 
          className={classNames(
            'navigation', 
            { 
              'navigation--open': this.state.open,
            }
          )}>
        <img className='navigation__logo' src={logo} alt="logo" onClick={this._onNavClick.bind(this)} 
        />
      </div>
    );
  }
}

export default Navigation;
