import axios from "axios";

const getTasks = () => {
	const config = {
		method: "GET",
		url: `/api/tasks`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config);
};

const tasksService = { getTasks };
export default tasksService;
