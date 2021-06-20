// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class UserProfiles extends Model {

  static get tableName() {
    return 'user_profiles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      search: ['name'],
      properties: {
        current_level: {
          type: 'integer'
        },
        date_of_birth: {
          type: 'date-time'
        },   
        name: {
          type: 'string'
        },
        gender: {
          type: 'any'
        },
        id: {
          type: 'integer'
        },
        institute_id: {
          type: 'integer'
        }
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
}

module.exports = function (app) {
  return UserProfiles;
};
