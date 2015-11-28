import alt from '../alt';
import staticDataService from '../services/static-data-service';

class StaticDataActions {
  fetchDateRanges() {
    staticDataService.getDateRanges();
    this.dispatch();
  }

  receiveDateRanges(dateRanges) {
    this.dispatch(dateRanges);
  }

  setCurrentDateRange(id) {
    this.dispatch(id);
  }

  updateCurrentDateRange(data) {
    this.dispatch(data);
  }
}

export default alt.createActions(StaticDataActions);
