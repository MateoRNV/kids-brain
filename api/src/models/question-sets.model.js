// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class QuestionSets extends Model {

  static get tableName() {
    return 'question_sets';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['set_name'],

      properties: {
        id: {
          type: 'integer'
        },
        level: {
          type: 'integer'
        },
        tags: {
          type: 'string'
        },
        subject_id: {
          type: 'integer'
        },
        set_name: {
          type: 'string'
        },
        status: {
          type: 'string'
        },
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
  const db = app.get('knex');

  db.schema.hasTable('question_sets').then(exists => {
    if (!exists) {
      db.schema.createTable('question_sets', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created question_sets table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating question_sets table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating question_sets table', e)); // eslint-disable-line no-console

  return QuestionSets;
};
