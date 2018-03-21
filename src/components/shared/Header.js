import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="container">
          <div>
            <a href="/" className="logo">
              <img src="https://s3-us-west-1.amazonaws.com/jarvisdev/icon.svg" alt=""/>
              <div className="logo-light">Glassdoor NLP</div>
            </a>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;