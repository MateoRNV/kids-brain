
exports.up = async function(knex) {
    await knex.schema.createTable('countries', function (table) {
        table
        .increments('id', 10)
        .primary()
        .unsigned()
        .notNullable();
        table.string('name', 100).notNullable();
        table.integer('code').unsigned().notNullable();
    });
};  

exports.down = async function(knex) {
    await knex.schema.dropTable('countries');
 };