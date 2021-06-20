const { Service } = require('feathers-objection');

exports.StudentQuestionSummary = class StudentQuestionSummary extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
