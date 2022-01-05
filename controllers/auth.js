const { response } = require("express");
const User = require("../models/User");

const createUser = async (req, res = response) => {
  // const { name, email, password } = req.body;
  // console.log(errors);
  try {
    const usuario = new User(req.body);

    await usuario.save();

    res.status(201).json({
      ok: true,
      msg: "registro",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "please talk to the administrator",
    });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const revalidateToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
};
