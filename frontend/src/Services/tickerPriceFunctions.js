const { axiosHttpService } = require("./axioscall");

const getTickerPriceOption = (symbol) => {
	if (!symbol) {
		return;
	}

	return {
		method: "get",
		maxBodyLength: Infinity,
		url: `${process.env.REACT_APP_SERVER_URL}ticker/getprice?ticker=${symbol}`,
	};
};

export const getTickerPrice = async (symbol) => {
	if (!symbol) {
		return;
	}

	return await axiosHttpService(getTickerPriceOption(symbol));
};
