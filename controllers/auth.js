const { response } = require("express");
const { validationResult } = require("express-validator");

const createUser = (req, res = response) => {
  const { name, email, password } = req.body;

  // manejo de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  // console.log(errors);

  res.status(201).json({
    ok: true,
    msg: "registro",
    name,
    email,
    password,
  });
};

const loginUser = (req, res = response) => {
  // manejo de errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

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
