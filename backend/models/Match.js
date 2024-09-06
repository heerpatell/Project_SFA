const mongoose = require('mongoose');
const { Schema } = mongoose;

const matchSchema = new Schema({
  sessionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Session' 
  },
  matches: {
    type: Map,
    of: [{
      worker: { type: Number, required: true },
      customer: { type: Number, required: true },
      pretip:{type:Number},
      posttip:{type:Number},
      effort:{type:Number},
      customerSet:{type:Number},
      totalComp:{type:Number}
    }]
  }
});

module.exports = mongoose.model('Match', matchSchema);
