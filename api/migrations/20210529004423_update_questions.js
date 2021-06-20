exports.up = function(knex, Promise) {
    return knex.schema.alterTable('questions', function(t) { 
        t.foreign('set_id').references('subjects.id').onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('questions', function(t) {
        t.foreign('set_id').references('subjects.id').onDelete('CASCADE');
    });
};