// Initializes the `Institutes` service on path `/institutes`
const { Institutes } = require('./institutes.class');
const createModel = require('../../models/institutes.model');
const hooks = require('./institutes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/institutes', new Institutes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('institutes');

  service.hooks(hooks);
};