const express = require("express");

const router = express.Router();

const {
  getSweeps,
} = require("../../controllers/sweepController");

router.get("/", getSweeps);

module.exports = router;