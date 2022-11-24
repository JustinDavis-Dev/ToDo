import React, { useEffect, useState } from "react";
import tasksService from "../services/tasksService";
import Task from "../components/Task";
// import TaskForm from "../components/TaskForm";
import TaskModal from "../components/TaskModal";
import { Card, Button, ButtonGroup } from "react-bootstrap";

function Tasks(props) {
	const defaultTaskInfo = {
		id: "",
		title: "",
		completed: false,
	};

	const [tasks, setTasks] = useState({ tasks: [], taskComponents: [] });
	const [modalShow, setModalShow] = useState(false);
	const [taskInfo, setTaskInfo] = useState(defaultTaskInfo);
	const [filter, setFilter] = useState("All");

	useEffect(() => {
		console.log("mounted");
		getTasks();
	}, []);

	const getTasks = async () => {
		tasksService.getTasks().then(onGetTasksSuccess).catch(onServiceError);
	};

	const onGetTasksSuccess = (response) => {
		let taskArray = response.data;
		if (filter === "Completed") {
			taskArray = response.data.filter((task) => {
				if (task.completed) {
					return true;
				}
				return false;
			});
		} else if (filter === "Pending") {
			taskArray = response.data.filter((task) => {
				if (!task.completed) {
					return true;
				}
				return false;
			});
		}

		setTasks((prevState) => {
			const ps = { ...prevState };
			ps.tasks = response.data;
			ps.taskComponents = taskArray.map(mapTask);
			return ps;
		});
	};

	const onServiceError = (err) => {
		console.log("error", err);
	};

	const mapTask = (aTask) => {
		return <Task task={aTask} key={"Task-" + aTask.id} openForm={openForm} handleDelete={handleDelete} />;
	};

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

	const handleFilter = (e) => {
		console.log(e.target.value);
		setFilter(e.target.value);
		let filteredTasks = tasks.tasks;
		if (e.target.value === "Completed") {
			filteredTasks = tasks.tasks.filter((task) => {
				if (task.completed) {
					return true;
				}
				return false;
			});
		} else if (e.target.value === "Pending") {
			filteredTasks = tasks.tasks.filter((task) => {
				if (!task.completed) {
					return true;
				} else {
					return false;
				}
			});
		}

		setTasks((prevState) => {
			const ps = { ...prevState };
			ps.taskComponents = filteredTasks.map(mapTask);
			return ps;
		});
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
							<div className="text-end my-2">
								<ButtonGroup size="sm">
									<Button variant={`${filter === "All" ? "primary" : "outline-secondary"}`} value="All" onClick={handleFilter}>
										All
									</Button>
									<Button variant={`${filter === "Pending" ? "primary" : "outline-secondary"}`} value="Pending" onClick={handleFilter}>
										Pending
									</Button>
									<Button variant={`${filter === "Completed" ? "primary" : "outline-secondary"}`} value="Completed" onClick={handleFilter}>
										Complete
									</Button>
								</ButtonGroup>
							</div>

							{/* <button onClick={handleUpdate}>Update</button>
				<button onClick={handleDelete}>Delete</button> */}

							<div>{tasks.taskComponents}</div>
						</Card>
					</div>
				</div>
			</div>
			<TaskModal show={modalShow} hide={() => setModalShow(false)} task={taskInfo} />
		</>
	);
}

export default Tasks;
