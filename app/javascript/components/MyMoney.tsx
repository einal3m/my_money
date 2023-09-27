import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import ErrorBoundary from "./ErrorBoundary";
import Root from "./layout/Root";
import AccountList from "./accounts/AccountList";
import ErrorPage from "./layout/ErrorPage";
import ImportHistoryPage from "./import/ImportHistoryPage";
import TransactionList from "./transactions/TransactionList";
import ImportPage from "./import/ImportPage";
import CategoryList from "./categories/CategoryList";
import PatternList from "./patterns/PatternList";
import AccountBalanceChart from "./reports/AccountBalanceChart";
import CategoryReport from "./reports/CategoryReport";
import SubcategoryReport from "./reports/SubcategoryReport";
import IncomeExpenseBarChart from "./reports/IncomeExpenseBarChart";
import IncomeVsExpensesReport from "./reports/IncomeVsExpensesReport";
import LoanReport from "./loan/LoanReport";
import store from "../stores/store";
import apiUtil from "../util/api-util";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AccountList />,
      },
      {
        path: "/accounts",
        element: <AccountList />,
      },
      {
        path: "/transactions",
        element: <TransactionList />,
      },
      {
        path: "/categories",
        element: <CategoryList />,
      },
      {
        path: "/patterns",
        element: <PatternList />,
      },
      {
        path: "/import",
        element: <ImportPage />,
      },
      {
        path: "/importHistory",
        element: <ImportHistoryPage />,
      },
      {
        path: "/reports/accountBalance",
        element: <AccountBalanceChart />,
      },
      {
        path: "/reports/incomeVsExpenseBar",
        element: <IncomeExpenseBarChart />,
      },
      {
        path: "/reports/incomeVsExpenses",
        element: <IncomeVsExpensesReport />,
      },
      {
        path: "/reports/categoryReport",
        element: <CategoryReport />,
      },
      {
        path: "/reports/subcategoryReport",
        element: <SubcategoryReport />,
      },
      {
        path: "/reports/loanReport",
        element: <LoanReport />,
      },
    ],
  },
]);

interface MyMoneyProps {
  host: string;
}

export default function MyMoney({ host }: MyMoneyProps) {
  apiUtil.setUrl(host);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </Provider>
    </ErrorBoundary>
  );
}
