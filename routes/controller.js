const express = require('express');
const router = express.Router();
const Creature = require('../models/creature'); // Adjust the path as needed

// Get all creatures
router.get('/', async (req, res) => {
  try {
    const creatures = await Creature.find();
    res.json(creatures);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

// Get a creature by ID
router.get('/:id', async (req, res) => {
  try {
    const creature = await Creature.findById(req.params.id);
    res.json(creature);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

// Create a new creature
router.post('/', async (req, res) => {
  const creature = new Creature({
    name: req.body.name,
    habitat: req.body.habitat,
    diet: req.body.diet,
    isEndangered: req.body.isEndangered,
    lifespan: req.body.lifespan,
    discoveredDate: req.body.discoveredDate,
    hasWings: req.body.hasWings
  });

  try {
    const savedCreature = await creature.save();
    res.status(201).json(savedCreature);
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

// Update a creature by ID
router.patch('/:id', async (req, res) => {
  try {
    const creature = await Creature.findById(req.params.id);
    if (!creature) {
      return res.status(404).send('Creature not found');
    }

    // Update only the fields that are provided in the request body
    if (req.body.name) creature.name = req.body.name;
    if (req.body.habitat) creature.habitat = req.body.habitat;
    if (req.body.diet) creature.diet = req.body.diet;
    if (req.body.isEndangered !== undefined) creature.isEndangered = req.body.isEndangered;
    if (req.body.lifespan) creature.lifespan = req.body.lifespan;
    if (req.body.discoveredDate) creature.discoveredDate = req.body.discoveredDate;
    if (req.body.hasWings !== undefined) creature.hasWings = req.body.hasWings;

    const updatedCreature = await creature.save();
    res.json(updatedCreature);
  } catch (err) {
    res.status(400).send('Error: ' + err);
  }
});

// Delete a creature by ID
router.delete('/:id', async (req, res) => {
  try {
    const creature = await Creature.findById(req.params.id);
    if (!creature) {
      return res.status(404).send('Creature not found');
    }

    await creature.remove();
    res.json({ message: 'Creature deleted' });
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;
