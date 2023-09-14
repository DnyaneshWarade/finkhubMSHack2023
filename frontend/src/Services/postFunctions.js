const { axiosHttpService } = require("./axioscall");

const createPostOption = (post) => {
	if (!post) {
		return;
	}
	let data = JSON.stringify(post);
	return {
		method: "post",
		maxBodyLength: Infinity,
		url: `${process.env.REACT_APP_SERVER_URL}post/createPost`,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	};
};

export const createPost = async (post) => {
	if (!post) {
		return;
	}

	return await axiosHttpService(createPostOption(post));
};
