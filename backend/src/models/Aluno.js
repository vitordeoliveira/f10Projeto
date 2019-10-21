const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  //Basic Settings
  turma: {
    type: Schema.Types.ObjectId,
    ref: "turma"
  },

  turma_id: {
    type: String,
    required: true
  },

  trabalhos: [
    {
      trabalho: {
        type: Schema.Types.ObjectId,
        ref: "trabalho"
      },
      entrege: {
        type: String,
        require: true,
        dafault: "false"
      }
    }
  ]
});

module.exports = model("aluno", UserSchema);
