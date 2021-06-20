const { Service } = require('feathers-objection');

exports.QuestionSets = class QuestionSets extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
