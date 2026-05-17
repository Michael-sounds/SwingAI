const express = require("express");

const router = express.Router();

const {
  scanMarkets,
} = require("../../controllers/scannerController");

router.get("/", scanMarkets);

module.exports = router;