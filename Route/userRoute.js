const express = require("express");
const {
  userCreate,
  getUser,
  deleteUser,
  getUserById,
  userUpdate,
  Login,
  
} = require("../Controller/userControl");

const router = express.Router();

router.route("/register").post(userCreate);
router.route("/users").get(getUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/users/:id").get(getUserById);
router.route("/edit/:id").put(userUpdate);
router.route("/login").post(Login);


module.exports = router;
