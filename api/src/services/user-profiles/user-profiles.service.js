// Initializes the `userProfiles` service on path `/user-profiles`
const { UserProfiles } = require('./user-profiles.class');
const createModel = require('../../models/user-profiles.model');
const hooks = require('./user-profiles.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user-profiles', new UserProfiles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-profiles');

  service.hooks(hooks);
};
