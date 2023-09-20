const mongoose = require('mongoose');
const { format } = require('date-fns');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  text: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }
})

MessageSchema.virtual('timestamp_formatted').get(function() {
  return this.timestamp.toLocaleDateString();
})

module.exports = mongoose.model('Message', MessageSchema);