import reducer from '../api-status-reducer';
import ApiStatus from '../../util/api-status';

describe('reducer', () => {
  it('has a default state', () => {
    const state = reducer();
    expect(state.get('status')).toEqual(ApiStatus.DONE);
    expect(state.get('message')).toEqual(null);
  });

  describe('GET_CATEGORIES', () => {
    it('sets state to loading', () => {
      const state = reducer(undefined, { type: 'GET_CATEGORIES' });
      expect(state.get('status')).toEqual(ApiStatus.LOADING);
      expect(state.get('message')).toEqual(null);
    });
  });

  describe('SET_CATEGORY_TYPES, SET_CATEGORIES, SET_SUBCATEGORIES, SET_CATEGORY, SET_SUBCATEGORY', () => {
    it('sets state to done', () => {
      const state = reducer(undefined, { type: 'SET_CATEGORIES' });
      expect(state.get('status')).toEqual(ApiStatus.DONE);
      expect(state.get('message')).toEqual(null);
    });
  });

  describe('SAVE_CATEGORY, SAVE_SUBCATEGORY', () => {
    it('sets state to saving', () => {
      const state = reducer(undefined, { type: 'SAVE_CATEGORY' });
      expect(state.get('status')).toEqual(ApiStatus.SAVING);
      expect(state.get('message')).toEqual(null);
    });
  });

  describe('DELETE_CATEGORY, DELETE_SUBCATEGORY', () => {
    it('sets state to deleting', () => {
      const state = reducer(undefined, { type: 'DELETE_CATEGORY' });
      expect(state.get('status')).toEqual(ApiStatus.DELETING);
      expect(state.get('message')).toEqual(null);
    });
  });

  describe('REMOVE_CATEGORY, REMOVE_SUBCATEGORY', () => {
    it('sets state to done', () => {
      const state = reducer(undefined, { type: 'REMOVE_CATEGORY' });
      expect(state.get('status')).toEqual(ApiStatus.DONE);
      expect(state.get('message')).toEqual(null);
    });
  });

  describe('SET_API_ERROR', () => {
    it('sets state to error and message', () => {
      const state = reducer(undefined, { type: 'SET_API_ERROR', message: 'MyError' });
      expect(state.get('status')).toEqual(ApiStatus.ERROR);
      expect(state.get('message')).toEqual('MyError');
    });
  });

  describe('CLEAR_API_ERROR', () => {
    it('clears the store', () => {
      const state = reducer(undefined, { type: 'CLEAR_API_ERROR' });
      expect(state.get('status')).toEqual(ApiStatus.DONE);
    });
  });
});
