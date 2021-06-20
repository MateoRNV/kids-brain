// Initializes the `countries` service on path `/countries`
const Countries = require('../../models/countries.model');
const hooks = require('./countries.hooks');

module.exports = function (app) {
  const service = {
    async find () {
      let countries_list;
      let countries = await Countries.query().select('code').orderBy("name", "asc");
      if (countries.length) {
        countries_list = countries;
      }
      return Promise.resolve({ countries: countries_list })
    }
  }
  // Initialize our service with any options it requires
  app.use('/countries', service)

  app.service('countries').hooks(hooks)

}
