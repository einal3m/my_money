import FormValidator from '../form-validator';
import moment from 'moment';

describe('FormValidator', () => {
  let validator,
    schema;
  beforeEach(() => {
    schema = {
      name: { presence: true },
      number: { presence: true, numericality: true },
    };
    validator = new FormValidator(schema);
  });

  describe('constructor', () => {
    it('initializes the validation schema', () => {
      expect(validator.schema).toEqual(schema);
    });
  });

  describe('validateField', () => {
    it('validates a single field and keeps track of errors', () => {
      expect(validator.errors).toEqual({});
      expect(validator.validateField('name', 'hello')).toEqual(undefined);
      expect(validator.errors).toEqual({});
      expect(validator.validateField('name', '')).toEqual({ name: ['Name is required'] });
      expect(validator.errors).toEqual({ name: ['Name is required'] });
      expect(validator.validateField('number', 'ff')).toEqual({ number: ['Number is not a number'] });
      expect(validator.errors).toEqual({ name: ['Name is required'], number: ['Number is not a number'] });
      validator.validateField('name', 'hello');
      expect(validator.errors).toEqual({ number: ['Number is not a number'] });
    });
  });

  describe('validateAll', () => {
    it('validates all the fields', () => {
      const values = { name: 'Melanie', number: 6 };
      expect(validator.validateAll(values)).toEqual(undefined);

      values.name = '';
      expect(validator.validateAll(values)).toEqual({ name: ['Name is required'] });
      expect(validator.errors).toEqual({ name: ['Name is required'] });

      values.number = null;
      expect(validator.validateAll(values)).toEqual({ name: ['Name is required'], number: ['Number is required'] });
      expect(validator.errors).toEqual({ name: ['Name is required'], number: ['Number is required'] });
    });
  });

  describe('errorFor', () => {
    it('returns the first error for the requested field', () => {
      validator.errors = { name: ['Name is required'], number: ['Number is not a number'] };
      expect(validator.errorFor('number')).toEqual('Number is not a number');
      expect(validator.errorFor('other')).toEqual(undefined);
    });
  });

  describe('errorState', () => {
    it('returns bootstrap css error state styles for specified field', () => {
      validator.errors = { name: ['Name is required'], number: ['Number is not a number'] };
      expect(validator.errorState('name')).toEqual('has-error');
      expect(validator.errorState('other')).toEqual('has-success');
    });
  });
});
