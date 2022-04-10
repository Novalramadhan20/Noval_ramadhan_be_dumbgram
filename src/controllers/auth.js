const {express} = require("express");

// import model here
const { user } = require('../../models/');

// import package here
const Joi = require('joi');
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')

exports.register = async (req, res) => {
//  try {
//    const data = req.body;

    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      status: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)


        const isAlready = await user.findOne({
            where: {
              email: req.body.email,
            },
          });
      
          if (isAlready) {
            return res.send({
              error: {
                message: `Account ${req.body.email} is Already`,
              },
            });
          }


        const newUser = await user.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            status: req.body.status
        });
        //sc token
        const payload = { id: req.body.id };
        const ACCESS_TOKEN_SECRET = '0sdnOJIoinsdo9878IJNBIniiuinINiuYIUY'
        const token = jwt.sign(payload, ACCESS_TOKEN_SECRET)

        res.status(200).send({
            status: 'success',
            data: {
                name: newUser.name,
                email: newUser.email,
                token,
            }
        })
    
  } catch (error) {
    console.log(error);
    res.send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(data);

    if (error) {
      return res.send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.send({
        error: {
          message: `Email or Password not match!`,
        },
      });
    }
//naruh sc token
    const payload = { id: userExist.id };
    const ACCESS_TOKEN_SECRET = '0sdnOJIoinsdo9878IJNBIniiuinINiuYIUY'
    const token = jwt.sign(payload, ACCESS_TOKEN_SECRET)
    res.send({
      message: 'login success',
      data: {
        name: userExist.name,
        email: userExist.email,
        token,
    }
      
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'Failed',
      message: 'Server error',
    });
  }
};