import apiUtil from '../util/api-util';
import store from '../stores/store';

class ReportActions {
  getAccountBalanceReport(accountId, fromDate, toDate) {

    store.dispatch({ type: 'GET_REPORT' });
    return apiUtil.get({
      url: `report/eod_balance?account_id=${accountId}&from_date=${fromDate}&to_date=${toDate}`,
      onSuccess: response => this.storeAccountBalanceReport(accountId, response.report)
    });
  }

  storeAccountBalanceReport(accountId, report) {
    store.dispatch({ type: 'SET_ACCOUNT_BALANCE_REPORT', accountId: accountId, report: report });
  }
}

export default new ReportActions();
