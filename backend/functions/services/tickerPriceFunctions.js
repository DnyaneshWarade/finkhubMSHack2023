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

const getTickerMinMaxOption = (symbol) => {
	if (!symbol) {
		return;
	}

	return {
		method: "get",
		maxBodyLength: Infinity,
		url: `http://141.94.104.253:5000/min_max_range?symbol=${symbol}`,
		headers: {
			"Content-Type": "application/json",
		},
	};
};

const getTickerMinMax = async (symbol) => {
	if (!symbol) {
		return;
	}

	return await axiosHttpService(getTickerMinMaxOption(symbol));
};

module.exports = { getTickerPrice, getTickerMinMax };
