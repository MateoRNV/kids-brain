// Initializes the `StudentQuestionSummary` service on path `/student-question-summary`
const { StudentQuestionSummary } = require('./student-question-summary.class');
const createModel = require('../../models/student-question-summary.model');
const hooks = require('./student-question-summary.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/student-question-summary', new StudentQuestionSummary(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-question-summary');

  service.hooks(hooks);
};
