
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {name: "Pear Phone", price: 9.99, inventory: 0 },
        {name: "Guchee Bag", price: 100, inventory: 7},
        {name: "ASL Heel", price: 79, inventory: 10},
        {name: "Yoozeys",  price: 3, inventory: 1}
      ]);
    });
};
