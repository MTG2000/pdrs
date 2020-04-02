const Joi = require("@hapi/joi");

class Validation {
  async registerUser({ username, password, type, contact }) {
    const schema = Joi.object({
      username: Joi.string()
        .min(3)
        .max(20)
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(20),
      type: Joi.string().alphanum(),
      contact: Joi.string().required()
    });
    try {
      await schema.validateAsync({
        username,
        password,
        type,
        contact
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

module.exports = new Validation();
