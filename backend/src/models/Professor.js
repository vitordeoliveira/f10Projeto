const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  //Basic Settings
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  turmas: [
    {
      type: Schema.Types.ObjectId,
      ref: "turma"
    }
  ]
});

module.exports = model("professor", UserSchema);
