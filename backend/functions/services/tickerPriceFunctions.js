const { axiosHttpService } = require("./axioscall");

const getTickerPriceOption = (symbol) => {
	if (!symbol) {
		return;
	}

	return {
		method: "get",
		maxBodyLength: Infinity,
		url: `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=1d`,
		headers: {
			"Content-Type": "application/json",
		},
	};
};

const getTickerPrice = async (symbol) => {
	if (!symbol) {
		return;
	}

	return await axiosHttpService(getTickerPriceOption(symbol));
};

module.exports = { getTickerPrice };
