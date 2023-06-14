const axios = require("axios");
const { User, Log } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const Mail = require("../helpers/mailer");
const { OAuth2Client } = require("google-auth-library");
class Controller {
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "INPUT NOT FOUND" };
      }
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "LOGIN_INVALID" };
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "LOGIN_INVALID" };
      }
      const accessToken = signToken({
        id: user.id,
        nickname: user.nickname,
        email: user.email,
      });
      // Mail(email)
      res.status(200).json({
        statusCode: 200,
        accessToken,
        email,
        id: user.id,
        message: "Login, let's roll",
      });
    } catch (err) {
      next(err);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const { token_google } = req.body;
      const client = new OAuth2Client({
        clientId: process.env.CLIENT_ID,
      });

      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.CLIENT_ID,
      });

      const payload = await ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          nickname: payload.given_name,
          password: payload.jti,
        },
      });
      let token;
      let loggedUser;
      if (created) {
        token = signToken({ id: created.id, email: created.email });
        loggedUser = created;
      } else {
        token = signToken({ id: user.id, email: user.email });
        loggedUser = user;
      }
      res.status(200).json({
        statusCode: 200,
        id: user.id,
        email: user.email,
        access_token: token,
        message: "Login, let's roll",
      });
    } catch (err) {
      next(err);
    }
  }
  static async registerUser(req, res, next) {
    try {
      const { email, password, nickname } = req.body;
      if (nickname.length <= 4) {
        throw { name: "INPUT NOT MINIMUM" };
      }
      if (!email || !password) {
        throw { name: "INPUT NOT FOUND" };
      }
      const response = await User.create({
        nickname: nickname,
        email,
        password,
      });
      res.status(201).json({
        statusCode: 201,
        email: email,
        message: "Email has been created",
      });
    } catch (err) {
      next(err);
    }
  }

  static async renderWord(req, res, next) {
    try {
      let num = 0;
      getRandomInt(7);

      function getRandomInt(max) {
        num = Math.floor(Math.random() * max);
        validasi();
      }
      function validasi() {
        if (num <= 3 || num >= 9) {
          getRandomInt(7);
        } else {
          getHasil();
        }
      }
      async function getHasil() {
        const response = await axios.get(
          `https://random-word-api.herokuapp.com/word?length=${num}`
        );
        const WORD = response.data[0];
        const renderDefinition = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${WORD}`
        );

        const definition =
          renderDefinition.data[0].meanings[0].definitions[0].definition;
        res.status(200).json({
          statusCode: 201,
          WORD,
          wordLength: WORD.length,
          definition,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async inputLog(req, res, next) {
    try {
      const { id, email } = req.idRole;
      const { WORD } = req.body;
      console.log(WORD, "line 107");

      const renderDefinition = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${WORD}`
      );
      const definition =
        renderDefinition.data[0].meanings[0].definitions[0].definition;

      const inputLog = await Log.create({
        UserId: req.idRole.id,
        word: WORD,
        definition: definition,
      });

      res.status(201).json({
        statusCode: 201,
        word: WORD,
        meaning: definition,
        status: "Input to log berhasil",
      });
    } catch (err) {
      next(err);
    }
  }

  static async inputProgress(req, res, next) {
    try {
      const { WORD, definition } = req.body;
      const inputLog = await Log.create({
        UserId: req.idRole.id,
        word: WORD,
        definition: definition,
      });
      res.status(201).json({
        statusCode: 201,
        word: WORD,
        definition,
        inputLog,
        msg: "Thankyou for updating your progress, your progress has been submited",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async renderLogs(req, res, next) {
    try {
      const response = await Log.findAll({
        where: {
          UserId: req.idRole.id,
        },
      });
      res.status(201).json({
        statusCode: 200,
        response,
      });
    } catch (err) {
      next(err);
    }
  }

  static async renderLogsDetail(req, res, next) {
    try {
      const idLogs = req.params.id;
      const response = await Log.findOne({
        where: {
          id: idLogs,
          UserId: req.idRole.id,
        },
      });
      res.status(201).json({
        statusCode: 200,
        response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async updateLogs(req, res, next) {
    try {
      const idLogs = req.params.id;
      const { word, definition } = req.body;
      const response = await Log.update(
        {
          word: word,
          definition: definition,
          UserId: req.idRole.id,
        },
        {
          where: {
            id: idLogs,
            UserId: req.idRole.id,
          },
        }
      );
      res.status(201).json({
        statusCode: 200,
        response,
      });
    } catch (err) {
      next(err);
    }
  }
  static async deleteLog(req, res, next) {
    try {
      const id = req.params.id;
      const response = await Log.destroy({
        where: {
          id: id,
        },
      });
      console.log(response, "line216");
      res.status(201).json({
        statusCode: 200,
        response,
        msg: `log with ${id} has been deleted`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
