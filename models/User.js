const mongoose = require('mongoose');
const User = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
// module.exports = mongoose.model('City', citySchema);
module.exports = User;