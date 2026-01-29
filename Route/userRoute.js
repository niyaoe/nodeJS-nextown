const express = require("express");
const {
  userCreate,
  getUser,
  deleteUser,
  getUserById,
  userUpdate,
  Login,
  uploadProfilePhoto,
  
} = require("../Controller/userControl");
const { verifyToken } = require("../middleWares/authMiddleware");
const { testAPI } = require("../Controller/testAPI");
const upload = require("../Utils/multer")

const router = express.Router();

router.route("/register").post(userCreate);
router.route("/users").get(getUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/users/:id").get(getUserById);
router.route("/edit/:id").put(userUpdate);
router.route("/login").post(Login);

router.get("/tokenTest",verifyToken, testAPI)
router.post("/uploadprofilephoto",verifyToken,upload.single("profilePhoto"),uploadProfilePhoto)

module.exports = router;
