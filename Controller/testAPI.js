const testAPI = (req, res) => {
    console.log("testAPI function is Working");
    res.status(203).json({ message: "McLaren F1" })
    res.end()
}
module.exports = { testAPI }