exports.up = function(knex, Promise) {
    return knex.schema.alterTable('question_sets', function(t) { 
        t.enum('status', ['Active', 'Scheduled', 'Draft', 'Published'])
        t.string('tags',90);
        t.integer('level').unsigned().notNullable();     
        t.integer('subject_id', 10).unsigned().notNullable();
        t.foreign('subject_id').references('subjects.id').onDelete('CASCADE');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('question_sets', function(t) {
        t.enum('status', ['Active', 'Scheduled', 'Draft', 'Published'])
        t.string('tags',90);
        t.integer('level').unsigned().notNullable();  
        t.integer('subject_id', 10).unsigned().notNullable();
        t.foreign('subject_id').references('subjects.id').onDelete('CASCADE'); 
    });
};