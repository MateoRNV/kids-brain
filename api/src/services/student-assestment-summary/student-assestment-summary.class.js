const { Service } = require('feathers-objection');

exports.StudentAssestmentSummary = class StudentAssestmentSummary extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
