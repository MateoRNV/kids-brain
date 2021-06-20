// Initializes the `notify` service on path `/notify/sendEmailVarification`
const { Notify } = require('./notify.class');
const hooks = require('./notify.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/notify/sendEmailVarification', new Notify(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('notify/sendEmailVarification');

  service.hooks(hooks);
};
