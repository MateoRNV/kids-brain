// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class StudentAssestmentSummary extends Model {

  static get tableName() {
    return 'student_assestment_summary';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [],
      properties: {
        level: {
          type: 'integer'
        },
        score: {
          type: 'integer'
        },
        total_assestments: {
          type: 'integer'
        },
        user_id: {
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
      user: {
        relation: Model.HasOneRelation,
        modelClass: Users,
        join: {
          from: 'student_assestment_summary.user_id',
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

  db.schema.hasTable('student_assestment_summary').then(exists => {
    if (!exists) {
      db.schema.createTable('student_assestment_summary', table => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created student_assestment_summary table')) // eslint-disable-line no-console
        .catch(e => console.error('Error creating student_assestment_summary table', e)); // eslint-disable-line no-console
    }
  })
    .catch(e => console.error('Error creating student_assestment_summary table', e)); // eslint-disable-line no-console

  return StudentAssestmentSummary;
};
