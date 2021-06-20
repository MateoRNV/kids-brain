
exports.up = async function(knex) {
    await knex.schema.createTable('subjects', function (table) {
        table
        .increments('id', 10)
        .primary()
        .unsigned()
        .notNullable();
        table.string('name', 100);
    });

    await knex.schema.createTable('age_levels', function (table) {
        table
        .increments('id', 10)
        .primary()
        .unsigned()
        .notNullable();
        table.integer('age', 10).unsigned().notNullable();
        table.integer('level', 10).unsigned().notNullable();
    });
    
    await knex.schema.createTable('question_types', function (table) {
        table
            .increments('id', 10) 
            .primary()
            .unsigned()
            .notNullable();
            table.string('type', 255).notNullable();
            table.string('template_name', 255).notNullable();
            table.boolean('is_active').defaultTo(true);
            table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
            table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6));
    });

    await knex.schema.createTable('users', function (table) {
        table
            .increments('id', 10)
            .primary()
            .unsigned()
            .notNullable();
        table.string('parent_name', 100).notNullable();
        table.string('email', 255).notNullable();
        table.boolean('email_verified', 10).notNullable().defaultTo(false);
        table.string('password', 255).notNullable();
        table.string('phone_number', 18);
        table.integer('country_code');
        table.integer('parent_id', 10).unsigned();
        table
            .enum('role', ['Admin', 'Parent', 'Student'])
            .notNullable();
        table.json('extraAttr');
        table.boolean('subscriber').notNullable().defaultTo(false);
        table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6));
    });

    await knex.schema.createTable('question_sets', function (table) {
        table.increments('id', 10).primary().unsigned().notNullable();
        table.string('set_name', 255);
        table.string('type', 255);
        table.json('specification');
        table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6));
    });

    await knex.schema.createTable('questions', function (table) {
        table
            .increments('id', 10)
            .primary()
            .unsigned()
            .notNullable();
            table.string('title', 255);
            table.integer('level').unsigned().notNullable();
            table.integer('type_id', 10).unsigned().notNullable();
            table.boolean('is_active').defaultTo(true);
            table.integer('subject_id', 10).unsigned().notNullable();
            table.integer('points', 100).unsigned().notNullable();  
            table.enum('status', ['Active', 'Scheduled', 'Draft', 'Published'])
            table.string('tags',90);
            table.json('specification');
            table.boolean('subscriber_only').defaultTo(false);
            table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
            table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6));
    });

    await knex.schema.createTable('student_assestment_summary', function (table) {
        table.integer('user_id', 10).unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.integer('question_id', 10).unsigned().notNullable();
        table.foreign('question_id').references('questions.id').onDelete('CASCADE');
        table.integer('total_attempt', 10).unsigned().notNullable();
        table.integer('total_passed', 10).unsigned().notNullable();
        table.integer('total_fails', 10).unsigned().notNullable();
    });

    await knex.schema.createTable('student_question_summary', function (table) {
        table.integer('user_id', 10).unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.integer('level', 10).unsigned().notNullable();
        table.integer('total_assestments', 10).unsigned().notNullable();
        table.bigInteger('score');
    });

    await knex.schema.createTable('institutes', function (table) {
        table
            .increments('id', 10)
            .primary()
            .unsigned()
            .notNullable();
        table.string('name', 150).notNullable();
        table.text('address', 150);
        table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6));
    });

    await knex.schema.createTable('user_profiles', function (table) {
        table.increments('id', 10)
        .primary()
        .unsigned()
        .notNullable();
        table.integer('user_id', 10).unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.string('name', 45).notNullable();
        table.string('date_of_birth',45).notNullable();
        table.integer('institute_id', 10).unsigned().notNullable();
        table.foreign('institute_id').references('institutes.id').onDelete('CASCADE');
        table.enum('gender', ['Male', 'Female', 'Other']).notNullable();
        table.integer('score', 100).unsigned();
        table.json('extraAttr');
        table.integer('current_level', 10).unsigned().defaultTo(1);
        table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6));
    });
};  

exports.down = async function(knex) {
   await knex.schema.dropTable('subjects');
   await knex.schema.dropTable('age_levels');
   await knex.schema.dropTable('institutes');
   await knex.schema.dropTable('question_types');
   await knex.schema.dropTable('users');
   await knex.schema.dropTable('questions');
   await knex.schema.dropTable('student_assestment_summary');
   await knex.schema.dropTable('student_question_summary');
   await knex.schema.dropTable('question_sets');
};
