const { Service } = require('feathers-objection');

exports.UserProfiles = class UserProfiles extends Service {
  constructor(options) {
    const { Model, ...otherOptions } = options;

    super({
      ...otherOptions,
      model: Model
    });
  }
};
