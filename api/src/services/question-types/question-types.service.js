// Initializes the `QuestionTypes` service on path `/question-types`
const { QuestionTypes } = require('./question-types.class');
const createModel = require('../../models/question-types.model');
const hooks = require('./question-types.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/question-types', new QuestionTypes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('question-types');

  service.hooks(hooks);
};
