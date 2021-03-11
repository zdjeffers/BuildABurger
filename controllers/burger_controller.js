const express = require('express');
const router = express.Router();
const burger = require('../models/burger.js');

// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
  burger.all((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log('hbsObject', hbsObject);
    res.render('index', hbsObject);
  });
});

//Post a new burger
router.post('/api/burgers', (req, res) => {
  burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) => {
    res.json({ id: result.insertId });
  });
});

//Update a burger
router.put('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;
  console.log('condition', condition);
  burger.update(
    {
      devoured: req.body.devoured,
    },
    condition,
    (result) => {
      if (result.changedRows === 0) {
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

//Delete a burger from the devoured list
router.delete('/api/burgers/:id', (req, res) => {
  const condition = `id = ${req.params.id}`;
  burger.delete(condition, (result) => {
    if (result.affectedRows === 0) {
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

module.exports = router;