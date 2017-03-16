import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';
import ReconciliationForm from '../reconciliation-form';
import FormControl from '../../common/controls/form-control';
import DatePicker from '../../common/date-picker/date-picker';
import MoneyInput from '../../common/controls/money-input';

describe('ReconciliationForm', () => {
  const account = {
    id: 12,
    name: 'My account',
    bank: 'My bank',
  };
  const reconciliation = {
    id: 20,
    accountId: 12,
    statementBalance: 140,
    statementDate: '2017-03-14',
    reconciled: false,
  };

  describe('render', () => {
    it('has a control for each editable property', () => {
      const form = shallow(<ReconciliationForm account={account} reconciliation={reconciliation} />);

      const [accountName, statementDate, statementBalance] = form.children();

      expect(accountName.type).toEqual(FormControl);
      expect(accountName.props.name).toEqual('accountName');
      expect(accountName.props.label).toEqual('Account');
      expect(accountName.props.children.props.children).toEqual('My account (My bank)');

      expect(statementDate.type).toEqual(FormControl);
      expect(statementDate.props.name).toEqual('statementDate');
      expect(statementDate.props.label).toEqual('Statement Date');
      expect(statementDate.props.children.type).toEqual(DatePicker);
      expect(statementDate.props.children.props.value).toEqual(moment('2017-03-14').format('YYYY-MM-DD'));

      expect(statementBalance.type).toEqual(FormControl);
      expect(statementBalance.props.name).toEqual('statementBalance');
      expect(statementBalance.props.label).toEqual('Statement Balance');
      expect(statementBalance.props.children.type).toEqual(MoneyInput);
      expect(statementBalance.props.children.props.value).toEqual(140);
    });
  });

  describe('getModel', () => {
    it('returns the reconciliation state', () => {
      const form = shallow(<ReconciliationForm account={account} reconciliation={reconciliation} />);

      form.setState({ reconciliation: { id: 13 } });

      expect(form.instance().getModel()).toEqual({ id: 13 });
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = shallow(<ReconciliationForm account={account} reconciliation={reconciliation} />);
      spyOn(form.instance(), 'forceUpdate');

      expect(form.instance().isValid()).toEqual(true);
      expect(form.instance().forceUpdate).toHaveBeenCalled();
    });

    describe('updating state and validation', () => {
      let form;
      let instance;

      beforeEach(() => {
        form = mount(<ReconciliationForm account={account} reconciliation={reconciliation} />);
        instance = form.instance();
      });

      it('updates state and validates date is required', () => {
        const statementDate = form.find('input').at(0);

        statementDate.prop('onChange')({ target: { value: '' } });
        statementDate.prop('onBlur')();

        expect(form.state('reconciliation').statementDate).toEqual(null);
        expect(instance.validator.errorState('statementDate')).toEqual('has-error');
        expect(instance.validator.errorFor('statementDate')).toEqual('Statement date is required');

        statementDate.prop('onChange')({ target: { value: '19-Dec-2015' } });
        statementDate.prop('onBlur')();
        expect(form.state('reconciliation').statementDate).toEqual('2015-12-19');
        expect(instance.validator.errorState('statementDate')).toEqual('has-success');
        expect(instance.validator.errorFor('statementDate')).toBeUndefined();
      });

      it('updates state and validates statement balance is required', () => {
        const balance = form.find(MoneyInput);

        balance.prop('onChange')({ target: { name: 'statementBalance', value: '' } });
        expect(form.state('reconciliation').statementBalance).toEqual('');
        expect(instance.validator.errorState('statementBalance')).toEqual('has-error');
        expect(instance.validator.errorFor('statementBalance')).toEqual('Statement balance is required');

        balance.prop('onChange')({ target: { name: 'statementBalance', value: 'not a number' } });
        expect(form.state('reconciliation').statementBalance).toEqual('not a number');
        expect(instance.validator.errorState('statementBalance')).toEqual('has-error');
        expect(instance.validator.errorFor('statementBalance')).toEqual('Statement balance is not a number');

        balance.prop('onChange')({ target: { name: 'statementBalance', value: 4000 } });
        expect(form.state('reconciliation').statementBalance).toEqual(4000);
        expect(instance.validator.errorState('statementBalance')).toEqual('has-success');
        expect(instance.validator.errorFor('statementBalance')).toBeUndefined();
      });
    });
  });
});
