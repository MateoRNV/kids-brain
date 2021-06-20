const { Service } = require('feathers-objection');
const Countries = require('../../models/countries.model');

exports.Users = class Users extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }

};
