// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class StudentQuestionSummary extends Model {

  static get tableName() {
    return 'student_question_summary';
  }

  /**
   * @override
   */
  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      search: [],
      properties: {
        question_id: {
          type: 'integer'
        },
        total_attempt: {
          type: 'integer'
        },
        total_fails: {
          type: 'integer'
        },
        total_passed: {
          type: 'integer'
        },
        user_id: {
          type: 'integer'
        },
      }
    }
  }

  /**
   * @override
   */
  static get relationMappings() {
    return {
      question: {
        relation: Model.HasOneRelation,
        modelClass: Questions,
        join: {
          from: 'student_question_summary.question_id',
          to: 'questions.id'
        }
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: 'student_question_summary.user_id',
          to: 'users.id'
        }
      },
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

  db.schema.hasTable('student_question_summary').then(exists => {
    if (!exists) {
      db.schema.createTable('student_question_summary', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created student_question_summary table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating student_question_summary table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating student_question_summary table', e)); // eslint-disable-line no-console

  return StudentQuestionSummary;
};
