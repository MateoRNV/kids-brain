const { Service } = require('feathers-objection');

exports.QuestionTypes = class QuestionTypes extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
