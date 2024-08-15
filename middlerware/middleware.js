const Joi = require('joi');

const userValidation =  (req, res, next) => {
    const registerSchema = Joi.object({
      name: Joi.string().min(3).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-z0-9!@#$]{5,30}$"))
        .min(6)
        .max(30)
        .required(),
        trade: Joi.string(),
        metro: Joi.string(),
        profilePhoto: Joi.string(),
    });
  
    const { error } = registerSchema.validate(req.body);
  
    if (error) {
      error.status = 400;
      return next(error);
    }
    next()
}

module.exports = userValidation;