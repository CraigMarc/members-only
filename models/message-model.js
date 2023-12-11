const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, minLength: 1, maxLength: 100 },
  text: { type: String, required: true },
  timeStamp: { type: Date, required: true },
  userName: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for item URL
MessageSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/home/message/${this._id}`;
});

// Virtual for Date
MessageSchema.virtual("formattedDate").get(function () {
  // We don't use an arrow function as we'll need the this object
  return this.timeStamp.toLocaleString();
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);