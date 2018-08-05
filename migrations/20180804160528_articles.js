
exports.up = function (knex, Promise) {
  return knex.schema.createTable("articles", (table) => {
    table.increments();
    table.string("author").notNullable();
    table.text("body").notNullable();
    table.string("title").notNullable();
    table.string("urltitle");
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("articles");
};