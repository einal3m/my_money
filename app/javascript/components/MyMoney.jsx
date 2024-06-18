import React from "react";
import {
  BrowserRouter as Router,
  Routes,
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
import LoanReport from './loan/LoanReport';
import store from '../stores/store';
import apiUtil from '../util/api-util';

export default class MyMoney extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <Router>
          <Header />
          <Provider store={store}>
            <Routes>
              <Route path="/" element={<AccountList />} />
              <Route path="/accounts" element={<AccountList />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/patterns" element={<PatternList />} />
              <Route path="/reconciliations" element={<ReconciliationList />} />
              <Route path="/import" element={<ImportPage />} />
              <Route path="/importHistory" element={<ImportHistoryPage />} />
              <Route path="/reports/accountBalance" element={<AccountBalanceChart />} />
              <Route path="/reports/incomeVsExpenseBar" element={<IncomeExpenseBarChart />} />
              <Route path="/reports/incomeVsExpenses" element={<IncomeVsExpensesReport />} />
              <Route path="/reports/categoryReport" element={<CategoryReport />} />
              <Route path="/reports/subcategoryReport" element={<SubcategoryReport />} />
              <Route path="/reports/loanReport" element={<LoanReport />} />
            </Routes>
          </Provider>
          <Footer />
        </Router>
      </ErrorBoundary>
    );
  }
}

const ReconciliationList = () => <h2>ReconciliationList</h2>;
