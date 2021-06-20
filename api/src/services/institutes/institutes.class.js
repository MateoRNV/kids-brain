const { Service } = require('feathers-objection');

exports.Institutes = class Institutes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
