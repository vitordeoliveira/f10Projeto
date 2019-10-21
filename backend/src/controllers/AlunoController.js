const Aluno = require("../models/Aluno");
const User = require("../models/User");
const Trabalho = require("../models/Trabalho");
const fs = require("fs");
var mime = require("mime-types");

//Google Cloud
const { Storage } = require("@google-cloud/storage");

const alunoStorage = new Storage({
  keyFilename: "./config/aluno_google.json",
  projectId: "mini-projeto-f10"
});

module.exports = {
  //Index
  async index(req, res) {
    try {
      const { _id, usuario_id, nome, account } = await req.user;

      //Verificar se conta ja existe
      if (account) {
        const { trabalhos } = await Aluno.findById({ _id: account });
        return res.json({ trabalhos, nome, usuario_id });
      }

      //Criar Aluno
      const newaluno = {
        user: _id
      };
      const aluno = await Aluno.create(newaluno);

      //Adicionar em User Account
      const user = await User.findById(_id);
      user.account = aluno._id;
      user.save();

      //Extrair trabalhos do novo aluno
      const trabalhos = aluno.trabalhos;

      return res.json({
        trabalhos,
        nome,
        usuario_id,
        msg: "Aluno criado com sucesso"
      });
    } catch (error) {
      console.log(error);
    }
  },

  async indexOne(req, res) {
    const id_account = req.params.id;
    const user = await User.findOne({ account: id_account });
    res.status(200).json(user);
  },

  //Entregar trabalho
  async entregarTrabalho(req, res) {
    try {
      const id = req.params.id;
      const { account, usuario_id } = req.user;
      const trabalho = await Trabalho.findById({ _id: id });

      if (!account || !id || !trabalho) {
        return res
          .status(404)
          .json({ msg: "Conta ou Trabalho nao encontrado" });
      }

      if (req.files === null) {
        return res.status(400).json({ msg: "No file uploaded" });
      }

      //Recebe o arquivo
      let file = req.files.file;
      const filename =
        usuario_id + "-" + trabalho._id + "." + mime.extension(file.mimetype);
      //Salva no disco
      await fs.writeFileSync(`./src/data/${filename}`, file.data);
      //Envia para o google storage
      await alunoStorage
        .bucket("aluno-trabalhos")
        .upload(`./src/data/${filename}`, {
          gzip: true
        });

      const options = {
        version: "v2", // defaults to 'v2' if missing.
        action: "read",
        expires: Date.now() + 1000 * 60 * 60 * 60 // 60 horas
      };

      const [url] = await alunoStorage
        .bucket("aluno-trabalhos")
        .file(filename)
        .getSignedUrl(options);

      // console.log(`The signed url for ${filename} is ${url}.`);
      //localiza o aluno
      const aluno = await Aluno.findById({ _id: account });

      //Verifica se o trabalho j? foi entregue
      aluno.trabalhos.forEach(doc => {
        if (doc.trabalho == id) {
          if (doc.entrege === "false") {
            //Adiciona trabalho a entreges
            const newObj = {
              aluno: account,
              url: url
            };
            trabalho.entreges.push(newObj);

            //Busca dentro dos trabalhos do aluno o trabalho e seta para entrege = true
            aluno.trabalhos.forEach(doc => {
              if (doc.trabalho == id) {
                doc.entrege = true;
              }
            });
            aluno.save();
            trabalho.save();

            return res.status(200).json(aluno);
          }
        }
      });
    } catch (error) {
      return res.status(500).json({ msg: "Erro no servidor" });
    }
  }
};
