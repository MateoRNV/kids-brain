const { Service } = require('feathers-objection');

exports.Countries = class Countries extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
