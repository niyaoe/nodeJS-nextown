const smartphoneModel = require("../Models/smartphone");

const smartphoneCreate = async (req, res) => {
  const { Name, Price, Display, RAM } = req.body;
  console.log("after DS :", req.body);


  try {
    const smartphoneDetails = await smartphoneModel.create({
      Name,
      Price,
      Display,
      RAM,
    });
    res.json({ status: true, data: smartphoneDetails });
  } catch (error) {
    return res.status(500).json("issue warranted");
  }
};

const getPhone = async (req, res) => {

  try {
    const allPhones = await smartphoneModel.find()
    res.json(allPhones)
  } catch (error) {
    console.log("fetch error");
    return res.status(500).json("internal server error")

  }
}


const getPhoneById = async (req,res) => {
  const getId = req.params.id;
  try {
    const singlePhone = await smartphoneModel.findById(getId)
    res.json(singlePhone)

  } catch (error) {
    console.log("fetch error");
    return res.status(500).json("error")
    
  }
}

const deletePhone = async (req,res) =>{
  const getId = req.params.id;
  try {
    const deletedPhone = await smartphoneModel.findByIdAndDelete(getId)
    res.json("deleted successFully")
  } catch (error) {
    return res.status(500).json("unable to delete")
    console.log("unable to delete");
    
  }
}

const updatePhone = async (req,res) =>{
  const getId = req.params.id;
  const { Name, Price, Display, RAM } = req.body;

  try {
    const updatedPhone = await smartphoneModel.findByIdAndUpdate(getId,{Name, Price, Display, RAM },{ new : true })
    res.json(updatedPhone)
  } catch (error) {
    return res.status(500).json("unable to update")
    console.log("unable to update");
    
  }

}
module.exports = { smartphoneCreate, getPhone ,getPhoneById, deletePhone, updatePhone}
