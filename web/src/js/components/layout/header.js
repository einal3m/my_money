'use strict';

import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, NavbarBrand, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
require("../../../css/nav.scss");

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <NavbarBrand><Link className="navbar-brand" to="/"><strong>my</strong> money</Link></NavbarBrand>
        <Nav pullRight>
          <LinkContainer to="/accounts"><NavItem eventKey={1}>accounts</NavItem></LinkContainer>
          <LinkContainer to="/transactions"><NavItem eventKey={2}>transactions</NavItem></LinkContainer>
          <LinkContainer to="/categories"><NavItem eventKey={3}>categories</NavItem></LinkContainer>
          <LinkContainer to="/patterns"><NavItem eventKey={4}>patterns</NavItem></LinkContainer>
          <NavDropdown eventKey={5} title="reports" id="basic-nav-dropdown">
            <LinkContainer to="/reports/incomeVsExpenseBar"><MenuItem eventKey={1}>Income/Expense Bar Chart</MenuItem></LinkContainer>
            <LinkContainer to="/reports/incomeVsExpenses"><MenuItem eventKey={2}>Income vs Expenses</MenuItem></LinkContainer>
            <LinkContainer to="/reports"><MenuItem eventKey={3}>Category Report</MenuItem></LinkContainer>
            <LinkContainer to="/reports"><MenuItem eventKey={4}>Subcategory Report</MenuItem></LinkContainer>
            <MenuItem divider />
            <LinkContainer to="/reports/accountBalance"><MenuItem eventKey={4}>Account Balance Line Chart</MenuItem></LinkContainer>
          </NavDropdown>
        </Nav>
      </Navbar> 
    );
  }
}
