
exports.up = async function (knex) {

    await knex.schema.table('users', function (table) {
        table.string('password_reset_token', 255);
        table
            .datetime('password_reset_expiration')
            .defaultTo(knex.fn.now());
    })
};

exports.down = async function (knex) {

    await knex.schema.table('users', function (table) {
        table.dropColumn('password_reset_token');
        table.dropColumn('password_reset_expiration');
    })

};
