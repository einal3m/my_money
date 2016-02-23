import store from '../stores/store';

export class ApiStatusActions {

  storeApiError(message) {
    store.dispatch({type: 'SET_API_ERROR', message: message});
  }

  clearApiError(message) {
    store.dispatch({type: 'CLEAR_API_ERROR'});
  }
}

export default new ApiStatusActions();