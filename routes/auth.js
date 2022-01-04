// Rutas de Usuarios / Auth
// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");

const router = Router();

router.post(
  "/new",
  [
    // middlewares
    check("name", "the name is required").not().isEmpty(),
    check("email", "the email is required").isEmail(),
    check("password", "the password must be 6 characters").isLength({ min: 6 }),
    validarCampos,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "the email is required").isEmail(),
    check("password", "the password must be 6 characters").isLength({ min: 6 }),
    validarCampos,
  ],
  loginUser
);
router.get("/renew", revalidateToken);

module.exports = router;
