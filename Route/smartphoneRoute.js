const express = require("express");
const { smartphoneCreate,
    getPhone,
    getPhoneById,
    deletePhone,
    updatePhone } = require("../Controller/smartphoneControl");


const router = express.Router();


router.route('/createphone').post(smartphoneCreate)
router.route('/allphones').get(getPhone)
router.route('/:id').get(getPhoneById)
router.route('/delete/:id').delete(deletePhone)
router.route('/edit/:id').put(updatePhone)


module.exports = router