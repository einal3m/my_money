import React from 'react';
import { render } from 'react-dom';
import Header from './layout/header';
import Footer from './layout/footer';
import AccountList from './account-list';
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
