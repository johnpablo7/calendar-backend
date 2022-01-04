// Rutas de Usuarios / Auth
// host + /api/auth

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");

router.post(
  "/new",
  [
    // middlewares
    check("name", "the name is required").not().isEmpty(),
    check("email", "the email is required").isEmail(),
    check("password", "the password must be 6 characters").isLength({ min: 6 }),
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "the email is required").isEmail(),
    check("password", "the password must be 6 characters").isLength({ min: 6 }),
  ],
  loginUser
);
router.get("/renew", revalidateToken);

module.exports = router;
