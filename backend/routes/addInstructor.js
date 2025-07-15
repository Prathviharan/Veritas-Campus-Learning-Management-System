const express = require("express");
const {
  createInstructor,
} = require("../controllers/admin/createInstructor.controller");
const router = express.Router();

router.post("/addInstructor", createInstructor);
module.exports = router;
