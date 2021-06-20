
exports.up = function(knex) {
    return knex.schema.alterTable('questions', function(t) {
        t.dropColumn('level');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('questions', function(t) {
        t.dropColumn('level');
    });
};
