import { db } from "../connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const singUp = (req, res) =>{
  const { username, cnpj, restaurantName, email, confirmEmail, password, confirmPassword } = req.body;

  if (!username) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!cnpj) {
    return res.status(422).json({ msg: "O cnpj é obrigatório!" });
  }
  if (!restaurantName) {
    return res.status(422).json({ msg: "O nome do restaurante é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!confirmEmail) {
    return res.status(422).json({ msg: "Os emails não são iguais!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatória!" });
  }
  if (password != confirmPassword) {
    return res.status(422).json({ msg: "As senhas não são iguais!" });
  }

  db.query(
    "SELECT email FROM user WHERE email = ?",
    [email],
    async (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
        });
      }
      if (data.length > 0) {
        return res.status(500).json({ msg: "Email já esta sendo utilizado" });
      } else {
        const passwordHash = await bcrypt.hash(password, 8);
        db.query(
          "INSERT INTO user SET ?",
          { username, email, password: passwordHash },
          (error) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                msg: "Aconteceu algum erro no servidor, tente novamente mais tarde",
              });
            } else {
              return res
                .status(200)
                .json({ msg: "Cadastro efetuado com sucesso!" });
            }
          }
        );
      }
    }
  );
}

export const singIn = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum error no servidor, tente novamente mais tarde!",
        });
      }

      if (data.length === 0) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
      } else {
        const user = data[0];

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
          return res.status(422).json({ msg: "Senha incorreta!" });
        }

        try {
          const refreshToken = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
              id: user.password,
            },
            process.env.REFRESH,
            { algorithm: "HS256" }
          );

          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 3600,
              id: user.password,
            },
            process.env.TOKEN,
            { algorithm: "HS256" }
          );
          res
            .status(200)
            .json({ msg: "Usuário logado com sucesso!", token, refreshToken });
        } catch (erro) {
          console.log(erro);
          return res.status(500).json({
            msg: "Aconteceu um problema no servidor, tente novamente mais tarde!",
          });
        }
      }
    }
  );
};
