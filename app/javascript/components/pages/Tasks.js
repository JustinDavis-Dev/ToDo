import React, { useEffect, useState } from "react";
import axios from "axios";
import Task from "../components/Task";
// import TaskForm from "../components/TaskForm";
import TaskModal from "../components/TaskModal";
import { Card, Button } from "react-bootstrap";

function Tasks(props) {
	const defaultTaskInfo = {
		id: "",
		title: "",
		completed: false,
	};
	const [tasks, setTasks] = useState([]);
	const [modalShow, setModalShow] = useState(false);
	const [taskInfo, setTaskInfo] = useState(defaultTaskInfo);
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
			return <Task key={i} {...task} openForm={openForm} handleDelete={handleDelete} />;
		});
	};

	// const handleUpdate = () => {
	// 	console.log("update");
	// 	axios
	// 		.put(`/api/tasks/6?task[title]=update&task[completed]=false`)
	// 		.then((res) => console.log(res, "success"))
	// 		.catch((err) => console.log(err));
	// };

	// const handleDelete = () => {
	// 	console.log("delete");
	// 	axios
	// 		.delete(`/api/tasks/6`)
	// 		.then((res) => console.log(res, "success"))
	// 		.catch((err) => console.log(err));
	// };

	const openForm = (aTask) => {
		console.log(aTask);
		if (aTask > 0) {
			setTaskInfo((prevState) => {
				const ps = { ...prevState };
				ps.id = aTask;
				return ps;
			});
		} else {
			setTaskInfo(defaultTaskInfo);
		}
		setModalShow(true);
	};

	const handleDelete = (id) => {
		console.log(id);
	};

	return (
		<>
			<div className="container my-5">
				<div className="row justify-content-center">
					<div className="col-8">
						<Card body className="bg-light">
							<div className="text-center">
								<h1>To-Do</h1>
								<p>Organize yourself and get things done.</p>
								<Button variant="primary" onClick={openForm}>
									Add Task
								</Button>

								{/* <TaskForm {...props} /> */}
							</div>
							<div className="text-end">
								<Button variant="primary">All</Button>
								<Button variant="primary">Pending</Button>
								<Button variant="primary">Complete</Button>
							</div>

							{/* <button onClick={handleUpdate}>Update</button>
				<button onClick={handleDelete}>Delete</button> */}

							<div>{renderTasks()}</div>
						</Card>
					</div>
				</div>
			</div>
			<TaskModal show={modalShow} hide={() => setModalShow(false)} task={taskInfo} />
		</>
	);
}

export default Tasks;
