const express = require('express');
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
const { UserModel } = require('../model/auth.model');
const token_secret = process.env.TOKEN_KEY;

const validateUser = async (data) => {
  let { email, password } = data;
  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      if (await argon2.verify(user.password, password)) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};


const signupUser = async (req, res) => {
  let { email, password, firstname, lastname } = req.body;
  let existing_user = await UserModel.findOne({ email: email });
  if (existing_user) {
    return res.send({
      code: 404,
      status: false,
      message: "already registerd"
    })
  }
  let hash = await argon2.hash(password)
  let user = await UserModel.create({ firstname: firstname, lastname: lastname, email: email, password: hash })
  if (user) {
    return res.send({
      code: 200,
      data: user,
      status: true,
      message: "registerd succefully"
    })
  } else {
    return res.send({
      code: 404,
      status: false,
      message: "Invalid details"
    })
  }
}

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await validateUser({ email, password });
  if (user) {
    let token = jwt.sign(
      { userId: user._id, email: user.email, name: user.firstname },
      token_secret,
      {
        expiresIn: "7 days",
      }
    );


    res.status(200).send({ code: 200, status: true, token, message: "Login Successfully" });
  } else {
    return res.send({ code: 404, status: false, message: "something went wrong" });
  }
};
const getUser = async (req, res) => {
  let users = await UserModel.find()
  return res.send(users)
}
module.exports = {
  loginUser,
  signupUser,
  getUser
}