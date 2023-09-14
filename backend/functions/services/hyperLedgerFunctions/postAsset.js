const { axiosHttpService } = require("../axioscall");

const createPostOption = (post, id) => {
	if (!post || !id) {
		return;
	}

	let data = JSON.stringify({
		assetType: "Post",
		data: [
			{
				id: id,
				...post,
				ledgerMetadata: {
					owners: [
						{
							orgId: process.env.SPYDRA_MEMBERSHIP_ID,
							user: post.userId,
						},
					],
				},
			},
		],
	});

	return {
		method: "post",
		maxBodyLength: Infinity,
		url: `https://${process.env.SPYDRA_MEMBERSHIP_ID}.spydra.app/tokenize/${process.env.SPYDRA_APP_ID}/asset`,
		headers: {
			"Content-Type": "application/json",
			"X-API-KEY": process.env.SPYDRA_API_KEY,
		},
		data: data,
	};
};

const createPost = async (post) => {
	if (!post) {
		return;
	}
	const id = Math.floor(Date.now() / 1000);
	let result = await axiosHttpService(createPostOption(post, id));
	if (result.code === 201) {
		return { Id: id, ...result.res };
	}
	return result;
};

const getAllOpenPostsOption = () => {
	let data = JSON.stringify({
		query: `{
		  Post(isComplete: false){
			  id,
			  userId,
			  ticker,
			  timeStamp, 
			  stopLoss,
			  target,
			  tradeType,
			  price,
			  isComplete,
			  ledgerMetadata{
				owners
			  }
	  }}`,
		variables: {},
	});

	return {
		method: "post",
		maxBodyLength: Infinity,
		url: `https://${process.env.SPYDRA_MEMBERSHIP_ID}.spydra.app/tokenize/${process.env.SPYDRA_APP_ID}/graphql`,
		headers: {
			"X-API-KEY": process.env.SPYDRA_API_KEY,
		},
		data: data,
		"Content-Type": "application/json",
	};
};

const getAllOpenPosts = async () => {
	let result = await axiosHttpService(getAllOpenPostsOption());
	if (result.code === 200) {
		return result.res.data.Post;
	}
	return;
};

const updatePostOption = (post) => {
	if (!post) {
		return;
	}

	let data = JSON.stringify({
		assetType: "Post",
		data: [
			{
				...post,
			},
		],
	});

	return {
		method: "put",
		maxBodyLength: Infinity,
		url: `https://${process.env.SPYDRA_MEMBERSHIP_ID}.spydra.app/tokenize/${process.env.SPYDRA_APP_ID}/asset`,
		headers: {
			"Content-Type": "application/json",
			"X-API-KEY": process.env.SPYDRA_API_KEY,
		},
		data: data,
	};
};

const updatePost = async (post) => {
	if (!post) {
		return;
	}
	return await axiosHttpService(updatePostOption(post));
};

module.exports = { createPost, getAllOpenPosts, updatePost };
