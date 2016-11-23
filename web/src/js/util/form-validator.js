import validate from 'validate.js';
import moment from 'moment';

validate.extend(validate.validators.datetime, {
  // The value is guaranteed not to be null or undefined but otherwise it
  // could be anything.
  parse(value) {
    return +moment.utc(value);
  },
  // Input is a unix timestamp
  format(value, options) {
    const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return moment.utc(value).format(format);
  },
});

validate.validators.presence.options = { message: 'is required' };

export default class FormValidator {
  constructor(schema) {
    this.schema = schema;
    this.errors = {};
  }

  validateAll(values) {
    this.errors = validate.validate(values, this.schema);
    return this.errors;
  }

  validateField(field, value) {
    const validationField = {};
    validationField[field] = value;

    const validationRule = this.ruleForField(field);
    const error = validate.validate(validationField, validationRule);

    this.reconcileErrors(field, error);
    return error;
  }

  errorFor(field) {
    if (this.errors[field]) {
      return this.errors[field][0];
    }
    return undefined;
  }

  errorState(field) {
    if (this.errors[field]) {
      return 'has-error';
    }
    return 'has-success';
  }

  ruleForField(field) {
    if (field) {
      const singleRule = {};
      singleRule[field] = this.schema[field];
      return singleRule;
    }
    return this.schema;
  }

  reconcileErrors(field, error) {
    if (error) {
      this.errors[field] = error[field];
    } else {
      delete this.errors[field];
    }
  }
}
