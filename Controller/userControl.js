const userModel = require("../Models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userCreate = async (req, res) => {
  const { Name, Age, Email, Password } = req.body;
  console.log("after DS :", req.body);

  const hashedPassword = await bcrypt.hash(Password, 10)

  const existingUser = await userModel.findOne({ Email })

  if (existingUser) {
    return res.status(409).json("already Exist")

  } else {
    try {
      const userDetails = await userModel.create({
        Name,
        Age,
        Email,
        Password: hashedPassword,
      });
      res.json({ status: true, data: userDetails });
    } catch (error) {
      res.json({ status: false, error: {} });
      return res.status(500).json("issue warranted");
    }
  }
};

const getUser = async (req, res) => {
  try {
    const userDetails = await userModel.find();
    res.json(userDetails);
  } catch (error) {
    console.log("fetch error :", error);
    return res.status(500).json("internal server issue");
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deleteUser = await userModel.findByIdAndDelete(userId);
    res.json("Deleted successfully");
  } catch (error) {
    console.log("cant delete :", error);
  }
};

const getUserById = async (req, res) => {
  const getId = req.params.id
  try {
    const singleUser = await userModel.findById(getId)
    res.json(singleUser)
  } catch (error) {
    return res.status(500).json("get issue")
    console.log("issue warranted");

  }
}

const userUpdate = async (req, res) => {
  const getId = req.params.id;
  const { Name, Age, Email, Password } = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(getId, { Name, Age, Email, Password }, { new: true })
    res.json(updatedUser)
  } catch (error) {
    return res.status(500).json("issue warranted")

  }
}

const Login = async (req, res) => {

  const { Email, Password } = req.body
  
  const userDetails = await userModel.findOne({ Email })

  if (!userDetails) {condition
    return res.status(409).json("invalid username")
  }
  const isPasswordValid = await bcrypt.compare(Password, userDetails.Password)
  if (!isPasswordValid) {
    return res.status(401).send("incorrect Password")
  }

  const token = jwt.sign(         //( {payload} , secretKey, {expDate} )
    {
      userId : userDetails._id,
      Email: userDetails.Email,
      Password: userDetails.Password,
      Name: userDetails.Name
    },
    process.env.JWT_SECRET,
    {expiresIn: "48h"}
  )

  res.json({user:{
    _token: token,
    _Id: userDetails._id,
    Email: userDetails.Email,
    Password: userDetails.Password,
    Name: userDetails.Name,
    // profilePhoto
  }})

}

const uploadProfilePhoto = async (req,res) => {
  try {

    if (!req.file) {
      return res.status(400).json({message : "No file uploaded"})
    }
    const user = await userModel.findByIdAndUpdate(
      req.user.userId,
      { profilePhoto: `/uploads/profiles/${req.file.filename}`},
      { new: true }
    ).select("-Password")

    res.json({
      messsage: "Profile Photo uploaded successFully",
      user
           
    })

  } catch (error) {
    console.error("upload error",error)
    res.status(500).json({message:"failed to upload profile photo"})

  }


}

module.exports = { userCreate, getUser, deleteUser, getUserById, userUpdate, Login ,uploadProfilePhoto};
