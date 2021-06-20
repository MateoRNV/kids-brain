// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class AgeLevel extends Model {

  static get tableName() {
    return 'age_level';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],

      properties: {
        age: {
          type: 'integer'
        },
        id: {
          type: 'integer'
        },
        level: {
          type: 'integer'
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

  db.schema.hasTable('age_level').then(exists => {
    if (!exists) {
      db.schema.createTable('age_level', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created age_level table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating age_level table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating age_level table', e)); // eslint-disable-line no-console

  return AgeLevel;
};
