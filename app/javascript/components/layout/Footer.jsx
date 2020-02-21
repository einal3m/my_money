import React from 'react';
import { Link } from 'react-router-dom';

import('../../stylesheets/nav.scss');

const Footer = () => (
  <footer className="footer">
    <div>
      <h3>quick links</h3>
      <Link to="/accounts">accounts</Link><br />
      <Link to="/transactions">transactions</Link><br />
      <Link to="/categories">categories</Link><br />
      <Link to="/patterns">patterns</Link><br />
    </div>
    <div>
      <h3>cool stuff</h3>
      <a href="#accounts/first/import">import OFX file</a><br />
      <a href="#reports">reports</a><br />
    </div>
    <div>
      <h3>find me</h3>
      <a href="http://www.github.com/melm73" target="_blank" rel="noopener noreferrer">melm73 @ GitHub </a><br />
    </div>
  </footer>
);

export default Footer;
