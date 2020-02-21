import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Provider } from 'react-redux';
import Header from './layout/Header';
import Footer from './layout/Footer';

export default function BasicExample() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/"><AccountList /></Route>
        <Route path="/accounts"><AccountList /></Route>
        <Route path="/transactions"><TransactionsList /></Route>
        <Route path="/categories"><CategoryList /></Route>
        <Route path="/patterns"><PatternList /></Route>
        <Route path="/reconciliations"><ReconciliationList /></Route>
        <Route path="/import"><ImportPage /></Route>
        <Route path="/import-history"><ImportHistoryPage /></Route>
        <Route path="/reports/accountBalance"><AccountBalanceChart /></Route>
        <Route path="/reports/incomeVsExpenseBar"><IncomeVsExpenseBarChart /></Route>
        <Route path="/reports/incomeVsExpenses"><IncomeVsExpensesReport /></Route>
        <Route path="/reports/categoryReport"><CategoryReport /></Route>
        <Route path="/reports/subcategoryReport"><SubcategoryReport /></Route>
        <Route path="/reports/loanReport"><LoanReport /></Route>
      </Switch>
      <Footer />
    </Router>
  );
}

const AccountList = () => <h2>AccountList</h2>;
const TransactionsList = () => <h2>TransactionsList</h2>;
const CategoryList = () => <h2>CategoryList</h2>;
const PatternList = () => <h2>PatternList</h2>;
const ReconciliationList = () => <h2>ReconciliationList</h2>;
const ImportPage = () => <h2>ImportPage</h2>;
const ImportHistoryPage = () => <h2>ImportHistoryPage</h2>;
const AccountBalanceChart = () => <h2>AccountBalanceChart</h2>;
const IncomeVsExpenseBarChart = () => <h2>IncomeVsExpenseBarChart</h2>;
const IncomeVsExpensesReport = () => <h2>IncomeVsExpensesReport</h2>;
const CategoryReport = () => <h2>CategoryReport</h2>;
const SubcategoryReport = () => <h2>SubcategoryReport</h2>;
const LoanReport = () => <h2>LoanReport</h2>;



// import store from './stores/store';
// import apiUtil from './util/api-util';
// require('babel-polyfill');

// const MyMoney = props => (
//   <div>
//     <Header />
//     <Provider store={store}>
//       {props.children}
//     </Provider>
//     <Footer />
//   </div>
// );

// const host = document.getElementById('host').textContent;
// apiUtil.setUrl(host);



