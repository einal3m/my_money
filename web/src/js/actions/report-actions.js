import apiUtil from '../util/api-util';
import store from '../stores/store';

class ReportActions {
  getAccountBalanceReport() {
    const selectedAccounts = store.getState().accountStore.get('selectedAccounts');
    const dateRange = store.getState().dateRangeStore.get('currentDateRange').toJS();

    selectedAccounts.forEach((accountId) => {
      store.dispatch({ type: 'GET_REPORT' });
      return apiUtil.get({
        url: `report/eod_balance?account_id=${accountId}&from_date=${dateRange.fromDate}&to_date=${dateRange.toDate}`,
        onSuccess: response => this.storeAccountBalanceReport(accountId, response.report),
      });
    });
  }

  storeAccountBalanceReport(accountId, report) {
    store.dispatch({ type: 'SET_ACCOUNT_BALANCE_REPORT', accountId, report });
  }
}

export default new ReportActions();
