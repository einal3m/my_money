'use strict';

import React from 'react';
import { Link } from 'react-router';
require("../../../css/nav.scss");

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="row">

          <div className="col-sm-4">
            <h3>quick links</h3>
            <Link to="/accounts">accounts</Link><br />
            <Link to="/transactions">transactions</Link><br />
            <Link to="/categories">categories</Link><br />
            <Link to="/patterns">patterns</Link><br />
          </div>

          <div className="col-sm-4">
            <h3>cool stuff</h3>
            <a href='#accounts/first/import'>import OFX file</a><br />
            <a href='#reports'>reports</a><br />
          </div>

          <div className="col-sm-4">
            <h3>find me</h3>
            <a href="http://www.github.com/melm73" target="_blank">melm73 @ GitHub </a><br />
          </div>
          
        </div>    
      </footer>
    );
  }
}
