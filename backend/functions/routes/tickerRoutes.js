const express = require("express");
const tickerController = require("../controllers/tickerController");

const router = express.Router();

router.get("/getprice", tickerController.getTickerPrice);

module.exports = router;
