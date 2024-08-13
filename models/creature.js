const mongoose = require('mongoose');

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  habitat: {
    type: String,
    required: true
  },
  diet: {
    type: String, // The type of food the creature eats
    required: true
  },
  isEndangered: {
    type: Boolean, // Whether the creature is endangered
    required: true,
    default: false
  },
  lifespan: {
    type: Number, // Average lifespan in years
    required: false
  },
  discoveredDate: {
    type: Date, // The date when the creature was first discovered
    required: false
  },
  hasWings: {
    type: Boolean, // Whether the creature has wings
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Creature', creatureSchema);
