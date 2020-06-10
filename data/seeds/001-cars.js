// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };

exports.seed = function (knex) {
  return knex("cars")
    .truncate() // removes all rows from the table and reset ids back to 1
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert(generateData());
    });
};

function generateData() {
  return [
    {
      VIN: "5asdf546a54sdf",
      make: "Ford",
      model: "f150",
      mileage: 32444,
    },
    {
      VIN: "5asdf5234eddf",
      make: "Ford",
      model: "f250",
      mileage: 325444,
    },
  ];
}