// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class uploads extends Model {

  static get tableName() {
    return 'uploads';
  }
  static get idColumn() {
    return 'id';
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt =  new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  $beforeUpdate() {
    this.updatedAt =  new Date().toISOString().slice(0, 19).replace('T', ' ');
  }
}

module.exports = function () {
  return uploads;
};
