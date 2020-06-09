const express = require("express");

// database access using knex
const knex = require("../data/connection.js"); // <<<< rename db to knex to align with docs... or else

const router = express.Router();

router.get("/", (req, res) => {
    knex
      .select("*")
      .from("accounts")
      .then(accounts => {
        res.status(200).json({ data: accounts });
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
      .from("accounts")
      .first()

      .then(account => {
        res.status(200).json({ data: account });
      })
      .catch(error => {
        console.log("GET / error", error);
  
        res.status(500).json({ message: error.message });
      });
});

router.post("/", (req, res) => {
    knex("accounts")
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

    knex("accounts")
        .where({ id }) // if not using a where, all records will be updated.... boo ya baby!!
        .update(changes)

        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "account updated successfully" });
            } else {
                res.status(404).json({ message: "no accounts found" });
            }
        })
        .catch(error => {
            console.log("PUT / error", error);
            res.status(500).json({ message: error.message });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    knex("accounts")
        .where({ id }) //must use where on Deletes
        .del()

        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: "account deleted successfully" });
            } else {
                res.status(404).json({ message: "no accounts found" });
            }
        })
        .catch(error => {
            console.log("DELETE / error", error);

            res.status(500).json({ message: error.message });
        });
});

module.exports = router;