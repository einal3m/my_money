import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import store from './stores/store';
import apiUtil from './util/api-util';
import AccountList from './components/accounts/account-list';
import TransactionList from './components/transactions/transaction-list';
import CategoryList from './components/categories/category-list';
import PatternList from './components/patterns/pattern-list';
import ReconciliationList from './components/reconciliation/reconciliation-list';
import ImportPage from './components/import/import-page';
import ImportHistoryPage from './components/import/import-history-page';
import IncomeVsExpenseBarChart from './components/reports/income-expense-bar-chart';
import AccountBalanceChart from './components/reports/account-balance-chart';
import IncomeVsExpensesReport from './components/reports/income-vs-expenses-report';
import CategoryReport from './components/reports/category-report';
import SubcategoryReport from './components/reports/subcategory-report';
import LoanReport from './components/loan/loan-report';

require('babel-polyfill');

const App = props => (
  <div>
    <Header />
    <Provider store={store}>
      {props.children}
    </Provider>
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

const host = document.getElementById('host').textContent;
apiUtil.setUrl(host);

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="accounts" component={AccountList} />
      <Route path="transactions" component={TransactionList} />
      <Route path="categories" component={CategoryList} />
      <Route path="patterns" component={PatternList} />
      <Route path="reconciliations" component={ReconciliationList} />
      <Route path="import" component={ImportPage} />
      <Route path="import-history" component={ImportHistoryPage} />
      <Route path="reports">
        <Route path="accountBalance" component={AccountBalanceChart} />
        <Route path="incomeVsExpenseBar" component={IncomeVsExpenseBarChart} />
        <Route path="incomeVsExpenses" component={IncomeVsExpensesReport} />
        <Route path="categoryReport" component={CategoryReport} />
        <Route path="subcategoryReport" component={SubcategoryReport} />
        <Route path="loanReport" component={LoanReport} />
      </Route>
      <IndexRoute component={AccountList} />
    </Route>
  </Router>
), document.getElementById('app'));
