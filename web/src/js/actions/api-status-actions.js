import store from '../stores/store';

export class ApiStatusActions {

  storeApiError = (message) => {
    store.dispatch({ type: 'SET_API_ERROR', message });
  };

  clearApiError = () => {
    store.dispatch({ type: 'CLEAR_API_ERROR' });
  };
}

export default new ApiStatusActions();
