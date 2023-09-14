const { logger } = require("firebase-functions/v1");
const Post = require("../models/post");
const { getTickerPrice } = require("../services/tickerPriceFunctions");

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
				return res.status(200).send(`${tickerCurrentPrice}`);
			}
		}
	} catch (error) {
		logger.error(error);
	}
	res.status(400).send("Invalid request");
};
