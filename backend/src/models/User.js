const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  //Basic Settings
  usuario_id: {
    type: String,
    required: true
  },

  nome: {
    type: String,
    required: true
  },

  login: {
    type: String,
    required: true
  },

  role: {
    type: String,
    required: true
  },

  account: {
    type: Schema.Types.ObjectId
  }
});

module.exports = model("users", UserSchema);
