// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class Subjects extends Model {

  static get tableName() {
    return 'subjects';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['text'],
      search: ['name',],
      properties: {
        created: {
          type: 'date-time'
        },
        id: {
          type: 'integer'
        },
        modified: {
          type: 'date-time'
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

  db.schema.hasTable('subjects').then(exists => {
    if (!exists) {
      db.schema.createTable('subjects', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created subjects table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating subjects table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating subjects table', e)); // eslint-disable-line no-console

  return Subjects;
};
