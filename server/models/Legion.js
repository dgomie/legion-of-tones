const { Schema, model } = require('mongoose');

// Define the song schema
const songSchema = new Schema({
  title: String,
  artist: String,
  url: String,
});

// Define the vote schema
const voteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  songId: { type: Schema.Types.ObjectId, ref: 'Song' },
  points: Number,
});

// Define the round schema
const roundSchema = new Schema({
  _id: Schema.Types.ObjectId,
  roundNumber: Number,
  prompt: String,
  submissionDeadline: Date,
  voteDeadline: Date,
  submissions: [songSchema],
  votes: [voteSchema],
});

const legionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    numPlayers: { type: Number, required: true },
    maxPlayers: { type: Number, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    numRounds: { type: Number, required: true },
    voteTime: { type: Number, required: true },
    submitTime: { type: Number, required: true },
    rounds: [roundSchema],
  },
  {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
  }
);

const Legion = model('Legion', legionSchema);

module.exports = Legion;