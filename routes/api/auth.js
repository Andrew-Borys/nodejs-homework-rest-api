const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/auth");
const { validation, isAuthorized } = require("../../middlewares");
const { schemas } = require("../../models/user");
const router = express.Router();

// sigup
router.post("/singup", validation(schemas.singup), ctrlWrapper(ctrl.singup));
// login
router.post("/login", validation(schemas.login), ctrlWrapper(ctrl.login));

router.get("/current", isAuthorized, ctrlWrapper(ctrl.getCurrent));

router.get("./logout", isAuthorized, ctrlWrapper(ctrl.logout));

module.exports = router;