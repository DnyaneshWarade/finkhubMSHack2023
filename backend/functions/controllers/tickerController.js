const { logger } = require("firebase-functions/v1");
const Post = require("../models/post");
const {
	getTickerPrice,
	getTickerMinMax,
} = require("../services/tickerPriceFunctions");
const { json } = require("express");

exports.getTickerPrice = async (req, res) => {
	try {
		const ticker = req.query.ticker;
		// validate the params
		if (!ticker) {
			logger.error("Invalid request param");
			return response.status(400).send("Invalid param");
		}
		var result = await getTickerPrice(ticker);
		if (result.code === 200 && result.res.chart.result.length > 0) {
			var tickerCurrentPrice =
				result.res.chart.result[0].meta.regularMarketPrice;
			if (tickerCurrentPrice) {
				// get min max for the symbol as well
				var minMaxRet = await getTickerMinMax(ticker);
				var min = 0;
				var max = 0;
				var ret;
				if (minMaxRet.code === 200) {
					ret = { price: tickerCurrentPrice, ...minMaxRet.res };
				} else {
					ret = { price: tickerCurrentPrice, min: min, max: max };
				}

				return res.status(200).json(ret);
			}
		}
	} catch (error) {
		logger.error(error);
	}
	res.status(400).send("Invalid request");
};
