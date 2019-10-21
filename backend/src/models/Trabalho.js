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

  descricao: {
    type: String,
    required: true
  },

  inicio: {
    type: Date,
    required: true
  },

  fim: {
    type: Date,
    required: true
  },

  entreges: [
    {
      aluno: {
        type: Schema.Types.ObjectId,
        ref: "aluno"
      },

      nota: {
        type: String,
        default: "Ainda nao avaliada"
      },

      url: {
        type: String
        // require: true
      },

      dataEntrega: {
        type: Date,
        required: true,
        default: Date.now()
      }
    }
  ]
});

module.exports = model("trabalho", UserSchema);
