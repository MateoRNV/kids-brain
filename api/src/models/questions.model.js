// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');
const { Subjects } = require('./subjects.model');
const { QuestionTypes } = require('./question-types.model');
class Questions extends Model {

  static get tableName() {
    return 'questions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['level',],
      search: ['title',],
      properties: {
        id: {
          type: 'integer'
        },
        is_active: {
          type: 'integer'
        },
        level: {
          type: 'integer'
        },
        score: {
          type: 'integer'
        },
        specification: {
          type: 'any'
        },
        subject_id: {
          type: 'integer'
        },
        subscriber_only: {
          type: 'integer'
        },
        title: {
          type: 'string'
        },
        type_id: {
          type: 'integer'
        },
      }
    };
  }

  /**
   * @override
   */
  static get relationMappings() {
    return {
      subject: {
        relation: Model.HasOneRelation,
        modelClass: Subjects,
        join: {
          from: 'questions.subject_id',
          to: 'subjects.id'
        }
      },
      questionType: {
        relation: Model.HasOneRelation,
        modelClass: QuestionTypes,
        join: {
          from: 'questions.type_id',
          to: 'question_types.id'
        }
      },
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

  db.schema.hasTable('questions').then(exists => {
    if (!exists) {
      db.schema.createTable('questions', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created questions table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating questions table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating questions table', e)); // eslint-disable-line no-console

  return Questions;
};
