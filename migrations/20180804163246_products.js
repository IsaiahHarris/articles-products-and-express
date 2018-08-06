
exports.up = function(knex, Promise) {
  return knex.schema.createTable("products", (table)=>{
    table.increments();
    table.string("name")
    table.decimal("price", 8, 2).notNullable();
    table.integer("inventory").notNullable();
    table.timestamps(true,true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("products");
};
