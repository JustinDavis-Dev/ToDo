import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "./Task";
import TaskForm from "./TaskForm";

function Tasks(props) {
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		console.log("mounted");
		getTasks();
	}, []);
	const getTasks = async () => {
		let response = await axios.get("/api/tasks");
		setTasks(response.data);
	};
	const renderTasks = () => {
		if (tasks.length === 0) {
			return <p>No Tasks</p>;
		}
		return tasks.map((task, i) => {
			return <Task key={i} {...task} />;
		});
	};

	const handleUpdate = () => {
		console.log("update");
		axios
			.put(`/api/tasks/6?task[title]=update&task[completed]=false`)
			.then((res) => console.log(res, "success"))
			.catch((err) => console.log(err));
	};

	const handleDelete = () => {
		console.log("delete");
		axios
			.delete(`/api/tasks/6`)
			.then((res) => console.log(res, "success"))
			.catch((err) => console.log(err));
	};

	return (
		<>
			<h1>Tasks</h1>

			<TaskForm {...props} />
			<button onClick={handleUpdate}>Update</button>
			<button onClick={handleDelete}>Delete</button>

			<hr />
			{renderTasks()}
		</>
	);
}

export default Tasks;
