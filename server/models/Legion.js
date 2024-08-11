const { Schema, model } = require('mongoose');

// Function to round the date to the nearest hour
function getDate() {
    let now = new Date();
    let minutes = now.getMinutes();
    
    if (minutes >= 30) {
        now.setHours(now.getHours() + 1);
    }
    
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    
    return now;
}

// Define the song schema
const songSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
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
  _id: { type: Schema.Types.ObjectId, auto: true },
  roundNumber: Number,
  prompt: String,
  submissionDeadline: Date,
  voteDeadline: Date,
  isComplete: { type: Boolean, default: false },
  submissions: [songSchema],
  votes: [voteSchema],
});

const legionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    adminUser: { type: Schema.Types.ObjectId, ref: 'User' },
    maxPlayers: { type: Number, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    numRounds: { type: Number, required: true },
    voteTime: { type: Number, required: true }, // in days
    submitTime: { type: Number, required: true }, // in days
    rounds: [roundSchema],
  },
  {
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
  }
);

// Add virtual property for numPlayers
legionSchema.virtual('numPlayers').get(function() {
  return this.players.length;
});

// Pre-save hook to add rounds
legionSchema.pre('save', function(next) {
  if (this.isNew) {
    let currentDate = getDate();
    for (let i = 0; i < this.numRounds; i++) {
      const submissionDeadline = new Date(currentDate);
      submissionDeadline.setDate(submissionDeadline.getDate() + this.submitTime);

      const voteDeadline = new Date(submissionDeadline);
      voteDeadline.setDate(voteDeadline.getDate() + this.voteTime);

      this.rounds.push({
        roundNumber: i + 1,
        prompt: `Prompt for round ${i + 1}`,
        submissionDeadline: submissionDeadline,
        voteDeadline: voteDeadline,
      });

      // Update currentDate to the voteDeadline for the next round
      currentDate = new Date(voteDeadline);
    }
  }
  next();
});

const Legion = model('Legion', legionSchema);

module.exports = Legion;