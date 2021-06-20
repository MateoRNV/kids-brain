// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class Institutes extends Model {

  static get tableName() {
    return 'institutes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],

      properties: {
        adderess: {
          type: 'string'
        },
        id: {
          type: 'integer'
        },
        name: {
          type: 'string'
        },
      }
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function (app) {
  const db = app.get('knex');

  db.schema.hasTable('institutes').then(exists => {
    if (!exists) {
      db.schema.createTable('institutes', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created institutes table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating institutes table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating institutes table', e)); // eslint-disable-line no-console

  return Institutes;
};