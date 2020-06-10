
exports.up = function(knex) {
    return knex.schema.createTable("cars", tbl => {
        // a primary key, called id, integer, autoincrements
        tbl.increments();
    
        tbl.string("VIN", 255).notNullable().unique();
        tbl.string("make", 255).notNullable();
        tbl.string("model", 255).notNullable();
        tbl.integer("mileage", 255).notNullable();
        tbl.boolean("Auto_transmission");
        tbl.string("title_status", 100);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
};
