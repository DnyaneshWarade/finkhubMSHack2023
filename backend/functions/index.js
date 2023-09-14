const express = require("express");
const functions = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const postRoutes = require("./routes/postRoutes");
const tickerRoutes = require("./routes/tickerRoutes");
const cron = require("node-cron");
const cors = require("cors");
const {
	getAllOpenPosts,
	updatePost,
} = require("./services/hyperLedgerFunctions/postAsset");
const { getTickerPrice } = require("./services/tickerPriceFunctions");
const app = express();

admin.initializeApp();
app.use(express.json());

app.use(
	cors({
		allowedHeaders: ["Content-Type"],
	})
);

app.use("/post", postRoutes);
app.use("/ticker", tickerRoutes);

exports.api = functions.https.onRequest(app);

exports.postTrackerFunction = functions.pubsub
	.schedule("every 15 minutes")
	.timeZone("UTC")
	.onRun(async (context) => {
		try {
			// get all the open posts from blockchain
			var posts = await getAllOpenPosts();
			if (!posts) {
				return;
			}
			for (const post of posts) {
				if (!post.ticker) {
					continue;
				}
				// get the current price of ticker
				var result = await getTickerPrice(post.ticker);
				if (result.code === 200 && result.res.chart.result.length > 0) {
					// as per trade type check whether SL or target is met
					// is successfully met either condition then complete the post
					// and reward user otherwise continue with next post
					var tickerCurrentPrice =
						result.res.chart.result[0].meta.regularMarketPrice;
					var shouldCompletePost = false;
					if (post.tradeType === 0) {
						// this is a buy trade
						if (tickerCurrentPrice >= post.target) {
							// reward the user
							// to do
							shouldCompletePost = true;
						}
						if (tickerCurrentPrice <= post.stopLoss) {
							shouldCompletePost = true;
						}
					} else {
						// this is a sell trade
						if (tickerCurrentPrice <= post.target) {
							// reward the user
							// to do
							shouldCompletePost = true;
						}
						if (tickerCurrentPrice >= post.stopLoss) {
							shouldCompletePost = true;
						}
					}

					if (shouldCompletePost) {
						post.isComplete = true;
						await updatePost(post);
					}
				}
			}
		} catch (error) {
			logger.error(error);
		}
	});
