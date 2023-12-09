const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, minLength: 1, maxLength: 100 },
  lastName: { type: String, required: true, minLength: 1 },
  userName: { type: String, required: true, minLength: 4 },
  password: { type: String, required: true, minLength: 6 },
  member: { type: Boolean },
  admin: { type: Boolean },
  
});

// Virtual for item URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/home/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);