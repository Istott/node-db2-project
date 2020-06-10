const express = require("express");

// database access using knex
const knex = require("../data/connection.js"); // <<<< rename db to knex to align with docs... or else

const router = express.Router();

router.get("/", (req, res) => {
    knex
      .select("*")
      .from("cars")
      .then(cars => {
        res.status(200).json({ data: cars });
      })
      .catch(error => {
        console.log("GET / error", error);
  
        res.status(500).json({ message: error.message });
      });
});

router.get("/:id", (req, res) => {
    knex
      .select("*")
      .where({ id: req.params.id })
      .from("cars")
      .first()

      .then(car => {
        res.status(200).json({ data: car });
      })
      .catch(error => {
        console.log("GET / error", error);
  
        res.status(500).json({ message: error.message });
      });
});

router.post("/", (req, res) => {
    knex("cars")
        .insert(req.body, "id")

        .then(([id]) => {
            res.status(201).json({ data: id });
        })
        .catch(error => {
            console.log("POST / error", error);

            res.status(500).json({ message: error.message });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    knex("cars")
        .where({ id }) // if not using a where, all records will be updated.... boo ya baby!!
        .update(changes)

        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "Custom job successful" });
            } else {
                res.status(404).json({ message: "your broke dude" });
            }
        })
        .catch(error => {
            console.log("PUT / error", error);
            res.status(500).json({ message: error.message });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    knex("cars")
        .where({ id }) //must use where on Deletes
        .del()

        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "Car went boom boom" });
            } else {
                res.status(404).json({ message: "someone stole your car" });
            }
        })
        .catch(error => {
            console.log("DELETE / error", error);

            res.status(500).json({ message: error.message });
        });
});

module.exports = router;