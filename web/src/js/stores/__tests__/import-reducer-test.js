import importReducer from '../import-reducer';

describe('ImportReducer', () => {
  let transactions;
  beforeEach(() => {
    transactions = [
      { import: true, date: '2016-07-31', notes: 'note', categoryId: 10, subcategoryId: 11 },
      { import: false, date: '2016-07-11', categoryId: null, subcategoryId: null },
    ];
  });

  it('has a default state', () => {
    const state = importReducer();

    expect(state.get('transactions').toJS()).toEqual([]);
    expect(state.get('fileName')).toEqual(null);
  });

  describe('SET_OFX_TRANSACTIONS', () => {
    it('sets transactions array with transactions', () => {
      const action = { type: 'SET_OFX_TRANSACTIONS', transactions };
      const state = importReducer(undefined, action);

      expect(state.get('transactions').get(0).toJS()).toEqual(transactions[0]);
      expect(state.get('transactions').get(1).toJS()).toEqual(transactions[1]);
    });
  });

  describe('UPLOAD_OFX', () => {
    it('sets the file name', () => {
      const action = { type: 'UPLOAD_OFX', fileName: 'file.ofx' };
      const state = importReducer(undefined, action);

      expect(state.get('fileName')).toEqual('file.ofx');
    });
  });

  describe('update ofx transactions', () => {
    let initialState;
    beforeEach(() => {
      const action = { type: 'SET_OFX_TRANSACTIONS', transactions };
      initialState = importReducer(undefined, action);
    });

    describe('SET_NOTES', () => {
      it('sets the notes for the specified transaction', () => {
        const action = { type: 'SET_NOTES', index: 1, notes: 'newNote' };
        const state = importReducer(initialState, action);

        expect(state.get('transactions').get(1).get('notes')).toEqual('newNote');
      });
    });

    describe('SET_CATEGORY_ID', () => {
      it('sets the category id for the specified transaction, sets subcategory id to null', () => {
        const action = { type: 'SET_CATEGORY_ID', index: 0, categoryId: 13 };
        const state = importReducer(initialState, action);

        expect(state.get('transactions').get(0).get('categoryId')).toEqual(13);
        expect(state.get('transactions').get(0).get('subcategoryId')).toEqual(null);
      });
    });

    describe('SET_SUBCATEGORY_ID', () => {
      it('sets the subcategory id for the specified transaction', () => {
        const action = { type: 'SET_SUBCATEGORY_ID', index: 1, subcategoryId: 23 };
        const state = importReducer(initialState, action);

        expect(state.get('transactions').get(1).get('subcategoryId')).toEqual(23);
      });
    });

    describe('SET_IMPORT', () => {
      it('sets the import flag for the specified transaction', () => {
        const action = { type: 'SET_IMPORT', index: 1, import: true };
        const state = importReducer(initialState, action);

        expect(state.get('transactions').get(1).get('import')).toEqual(true);
      });
    });
  });
});
