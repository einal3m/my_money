import { useNavigate } from "react-router-dom";
import { setCurrentAccount } from "./account-actions";
import { setCurrentCategory, setCurrentSubcategory } from "./category-actions";

export function routeToTransactions(accountId) {
  if (accountId) setCurrentAccount(accountId);

  let navigate = useNavigate();
  navigate.push("/transactions");
}

export function routeToImportTransactions() {
  let navigate = useNavigate();
  navigate.push("/import");
}

export function routeToImportHistory(accountId) {
  setCurrentAccount(accountId);

  let navigate = useNavigate();
  navigate.push("/import-history");
}

export function routeToCategoryReport(categoryId) {
  setCurrentCategory(categoryId);

  let navigate = useNavigate();
  navigate.push("/reports/categoryReport");
}

export function routeToSubcategoryReport(categoryId, subcategoryId) {
  setCurrentCategory(categoryId);
  setCurrentSubcategory(subcategoryId);

  let navigate = useNavigate();
  navigate.push("/reports/subcategoryReport");
}

export function routeToLoanReport(accountId) {
  setCurrentAccount(accountId);

  let navigate = useNavigate();
  navigate.push("/reports/loanReport");
}
