import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import ErrorBoundary from './ErrorBoundary';
import Header from './layout/Header';
import Footer from './layout/Footer';
import AccountList from './accounts/AccountList';
import ImportHistoryPage from './import/ImportHistoryPage';
import TransactionList from './transactions/TransactionList';
import ImportPage from './import/ImportPage';
import CategoryList from './categories/CategoryList';
import PatternList from './patterns/PatternList';
import AccountBalanceChart from './reports/AccountBalanceChart';
import CategoryReport from './reports/CategoryReport';
import SubcategoryReport from './reports/SubcategoryReport';
import IncomeExpenseBarChart from './reports/IncomeExpenseBarChart';
import IncomeVsExpensesReport from './reports/IncomeVsExpensesReport';
import store from '../stores/store';
import apiUtil from '../util/api-util';

export default class MyMoney extends React.Component {
  constructor(props) {
    super();
    
    // const csrfToken = document.querySelector('[name=csrf-token]').content
    console.log('MyMoney.constructor');
    console.log(props);
    // console.log(csrfToken);
    
    apiUtil.setUrl(props.host);
    // apiUtil.setToken(csrfToken);
  }

  render() {
    return (
      <ErrorBoundary>
        <Router>
          <Header />
          <Provider store={store}>
            <Switch>
              <Route exact path="/"><AccountList /></Route>
              <Route path="/accounts"><AccountList /></Route>
              <Route path="/transactions"><TransactionList /></Route>
              <Route path="/categories"><CategoryList /></Route>
              <Route path="/patterns"><PatternList /></Route>
              <Route path="/reconciliations"><ReconciliationList /></Route>
              <Route path="/import"><ImportPage /></Route>
              <Route path="/import-history"><ImportHistoryPage /></Route>
              <Route path="/reports/accountBalance"><AccountBalanceChart /></Route>
              <Route path="/reports/incomeVsExpenseBar"><IncomeExpenseBarChart /></Route>
              <Route path="/reports/incomeVsExpenses"><IncomeVsExpensesReport /></Route>
              <Route path="/reports/categoryReport"><CategoryReport /></Route>
              <Route path="/reports/subcategoryReport"><SubcategoryReport /></Route>
              <Route path="/reports/loanReport"><LoanReport /></Route>
            </Switch>
          </Provider>
          <Footer />
        </Router>
      </ErrorBoundary>
    );
  }
}

const ReconciliationList = () => <h2>ReconciliationList</h2>;
const LoanReport = () => <h2>LoanReport</h2>;
