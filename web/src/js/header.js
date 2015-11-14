'use strict';

import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <NavBrand><Link className="navbar-brand" to="/"><strong>my</strong> money</Link></NavBrand>
        <Nav right>
          <LinkContainer to="/accounts"><NavItem eventKey={1}>accounts</NavItem></LinkContainer>
          <LinkContainer to="/transactions"><NavItem eventKey={2}>transactions</NavItem></LinkContainer>
          <LinkContainer to="/categories"><NavItem eventKey={3}>categories</NavItem></LinkContainer>
          <LinkContainer to="/patterns"><NavItem eventKey={4}>patterns</NavItem></LinkContainer>
          <NavDropdown eventKey={5} title="reports" id="basic-nav-dropdown">
            <LinkContainer to="/accounts"><MenuItem eventKey={1}>Income/Expense Bar Chart</MenuItem></LinkContainer>
            <LinkContainer to="/accounts"><MenuItem eventKey={2}>Income vs Expenses</MenuItem></LinkContainer>
            <LinkContainer to="/accounts"><MenuItem eventKey={3}>Category Report</MenuItem></LinkContainer>
            <LinkContainer to="/accounts"><MenuItem eventKey={4}>Subcategory Report</MenuItem></LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/accounts"><MenuItem eventKey={4}>Account Balance Line Chart</MenuItem></LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar> 
    );
  }     

//   <LinkContainer to="/foo" query={{bar: "baz"}}>
//   <Button>Foo</Button>
// </LinkContainer>
  // render() {
  //   return (
  //     <header>
  //       <nav className="navbar navbar-default navbar-fixed-top" role="navigation">
  //         <div className="container">
  //           <div className="navbar-header">
  //             <Link className="navbar-brand" to="/"><strong>my</strong> money</Link>
  //           </div>
  //           <ul className="nav navbar-nav  pull-right">
  //             <li><Link to="/accounts">accounts</Link></li>
  //             <li><a href="#accounts/current/transactions">transactions</a></li>
  //             <li><Link to="/categories">categories</Link></li>
  //             <li><a href="#patterns">patterns</a></li>
  //             <li className="dropdown">
  //               <a href="#reports" className='dropdown-toggle'>reports<span className='caret'></span></a>
  //               <ul className="dropdown-menu" role="menu">
  //                 <li><a href="#reports/income_expense_bar">Income/Expense Bar Chart</a></li>
  //                 <li><a href="#reports/income_vs_expense">Income vs Expenses</a></li>
  //                 <li><a href="#reports/category/">Category Report</a></li>
  //                 <li><a href="#reports/subcategory">Subcategory Report</a></li>
  //                 <li><a href="#reports/eod_balance">Account Balance Line Chart</a></li>
  //               </ul>
  //             </li>
  //           </ul>
  //         </div>
  //       </nav>
  //     </header>
  //   );
  // }
}