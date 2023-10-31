const app = require("express");
const router = app.Router();

const { renderAbout, renderIndex, } = require("../controllers/index.controller")

router.get("/", renderIndex)

router.get("/about", renderAbout)

module.exports = router