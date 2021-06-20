// Initializes the `StudentAssestmentSummary` service on path `/student-assestment-summary`
const { StudentAssestmentSummary } = require('./student-assestment-summary.class');
const createModel = require('../../models/student-assestment-summary.model');
const hooks = require('./student-assestment-summary.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/student-assestment-summary', new StudentAssestmentSummary(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-assestment-summary');

  service.hooks(hooks);
};
