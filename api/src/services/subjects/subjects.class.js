const { Service } = require('feathers-objection');

exports.Subjects = class Subjects extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
