import React from 'react';
import { render } from 'react-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import AccountList from './components/accounts/account-list';
import CategoryList from './category-list';
import { Router, Route, Link, IndexRoute } from 'react-router';

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
});

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="accounts" component={AccountList} />
      <Route path="categories" component={CategoryList} />
      <IndexRoute component={AccountList}/>
    </Route>
  </Router>
), document.getElementById('app'));
