// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
class Users extends Model {

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      search: ['email','phone_number'],
      properties: {
        email: {
          type: 'string'
        },
        email_varified: {
          type: 'integer'
        },
        extraAttr: {
          type: 'any'
        },
        parent_name: {
          type: 'string'
        },
        id: {
          type: 'integer'
        },
        phone_number: {
          type: 'string'
        },
        country_code: {
          type: 'integer'
        },
        password: {
          type: 'string'
        },
        role: {
          type: 'any'
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
  return Users;
};