
exports.up = async function(knex) {
    await knex.schema.createTable('uploads', function (table) {
        table
          .increments('id', 10)
          .primary()
          .unsigned()
          .notNullable();
    
        table
          .integer('userId', 10)
          .unsigned()
          .notNullable();
    
        table.string('originalname', 100).notNullable();
    
        table.string('mimetype', 20).notNullable();
    
        table.string('filename', 255).notNullable();
    
        table.string('url', 255).notNullable();
    
        table
          .integer('size', 11)
          .unsigned()
          .notNullable();
    
        table
          .datetime('createdAt', { precision: 6 }).defaultTo(knex.fn.now(6));
    
        table
          .datetime('updatedAt', { precision: 6 }).defaultTo(knex.fn.now(6));
    
      });
};

exports.down =async function(knex) {
    await knex.schema
    .dropTable('uploads');
};
