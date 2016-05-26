import React from 'react';
import { render } from 'react-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Provider } from 'react-redux';
import store from './stores/store';
import apiUtil from './util/api-util';
import AccountList from './components/accounts/account-list';
import TransactionList from './components/transactions/transaction-list';
import CategoryList from './components/categories/category-list';
import ImportPage from './components/import/import-page';
import IncomeVsExpenseBarChart from './components/reports/income-expense-bar-chart';
import AccountBalanceChart from './components/reports/account-balance-chart';
import IncomeVsExpensesReport from './components/reports/income-vs-expenses-report';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
require('babel-polyfill');

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

let host = document.getElementById('host').textContent;
apiUtil.setUrl(host);

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="accounts" component={AccountList} />
      <Route path="transactions" component={TransactionList} />
      <Route path="categories" component={CategoryList} />
      <Route path="import" component={ImportPage} />
      <Route path='reports'>
        <Route path='accountBalance' component={AccountBalanceChart} />
        <Route path='incomeVsExpenseBar' component={IncomeVsExpenseBarChart} />
        <Route path='incomeVsExpenses' component={IncomeVsExpensesReport} />
      </Route>
      <IndexRoute component={AccountList}/>
    </Route>
  </Router>
), document.getElementById('app'));
