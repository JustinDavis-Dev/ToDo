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

const add = (title) => {
	const config = {
		method: "POST",
		url: `/api/tasks?task[title]=${title}&task[completed]=false`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config);
};

const update = (id, title, completed) => {
	const config = {
		method: "PUT",
		url: `/api/tasks/${id}?task[title]=${title}&task[completed]=${completed}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config);
};

const destroy = (id) => {
	const config = {
		method: "DELETE",
		url: `/api/tasks/${id}`,
		withCredentials: true,
		crossdomain: true,
		headers: { "Content-Type": "application/json" },
	};
	return axios(config);
};

const tasksService = { getTasks, add, update, destroy };
export default tasksService;
