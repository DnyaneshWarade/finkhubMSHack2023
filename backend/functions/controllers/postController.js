const { logger } = require("firebase-functions/v1");
const Post = require("../models/post");
const {
	createPost,
	getAllOpenPosts,
} = require("../services/hyperLedgerFunctions/postAsset");

// Create post
exports.createPost = async (req, res) => {
	try {
		// validate the body
		if (!req.body) {
			logger.error("Invalid request data");
			response.status(400).send("Invalid data");
		}

		const { error } = Post.validate(req.body);
		if (error) {
			return res.status(400).send(error.details);
		}

		// store in hyperledger
		var result = await createPost(req.body);
		if (result.Id) {
			res.status(201).json(result.Id);
		} else {
			res.status(result.code).json(result.res);
		}
	} catch (error) {
		logger.error(error);
	}
	res.status(400).send("Invalid request");
};

// Get list of posts
exports.getAllPosts = async (req, res) => {
	var result = await getAllOpenPosts();
	if (result) {
		res.status(200).json(result);
	} else {
		res.status(400).send("Bad request");
	}
};
