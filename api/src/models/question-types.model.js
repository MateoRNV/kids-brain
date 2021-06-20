// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class QuestionTypes extends Model {

  static get tableName() {
    return 'question_types';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type'],

      properties: {
        id: {
          type: 'integer'
        },
        template_name: {
          type: 'string'
        },
        type: {
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

  db.schema.hasTable('question_types').then(exists => {
    if (!exists) {
      db.schema.createTable('question_types', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created question_types table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating question_types table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating question_types table', e)); // eslint-disable-line no-console

  return QuestionTypes;
};
