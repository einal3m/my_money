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
}

export default alt.createActions(StaticDataActions);
