exports.up = function(knex, Promise) {
    return knex.schema.alterTable('question_sets', function(t) { 
        t.enum('status', ['Active', 'Scheduled', 'Draft', 'Published', 'Archived']).alter()
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('question_sets', function(t) {
        t.enum('status', ['Active', 'Scheduled', 'Draft', 'Published','Archived']).alter()
    });
};