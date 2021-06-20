// Initializes the `questionSets` service on path `/question-sets`
const { QuestionSets } = require('./question-sets.class');
const createModel = require('../../models/question-sets.model');
const hooks = require('./question-sets.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/question-sets', new QuestionSets(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('question-sets');

  service.hooks(hooks);
};
