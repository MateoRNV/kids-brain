// Initializes the `age-levels` service on path `/age-levels`
const { AgeLevels } = require('./age-levels.class');
const createModel = require('../../models/age-levels.model');
const hooks = require('./age-levels.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/age-levels', new AgeLevels(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('age-levels');

  service.hooks(hooks);
};
