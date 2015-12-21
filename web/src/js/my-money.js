import React from 'react';
import { render } from 'react-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Provider } from 'react-redux';
import store from './stores/store';
import AccountList from './components/accounts/account-list';
import TransactionList from './components/transactions/transaction-list';
import CategoryList from './components/categories/category-list';
import { Router, Route, Link, IndexRoute } from 'react-router';

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
          <Provider store={store}>
            {this.props.children}
          </Provider>
        <Footer />
      </div>
    )
  }
});

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="accounts" component={AccountList} />
      <Route path="transactions" component={TransactionList} />
      <Route path="categories" component={CategoryList} />
      <IndexRoute component={AccountList}/>
    </Route>
  </Router>
), document.getElementById('app'));
