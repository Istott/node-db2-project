
exports.up = function(knex) {
    return knex.schema.createTable("cars", tbl => {
        // a primary key, called id, integer, autoincrements
        tbl.increments();
    
        tbl.string("VIN", 255).notNullable().unique();
        tbl.string("make", 255);
        tbl.string("model", 255);
        tbl.string("mileage", 255);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
};
