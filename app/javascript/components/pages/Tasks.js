import React, { useEffect, useState } from "react";
import tasksService from "../services/tasksService";
import Task from "../components/Task";
// import TaskForm from "../components/TaskForm";
import TaskModal from "../components/TaskModal";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import Swal from "sweetalert2";

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

	const getTasks = async (filterStatus) => {
		console.log(filterStatus);
		tasksService.getTasks().then(onGetTasksSuccess).catch(onServiceError);
	};

	const onGetTasksSuccess = (response) => {
		let taskArray = response.data;
		console.log("Filter Status", filter);
		if (filter === "Completed") {
			console.log("Completed filter");
			taskArray = response.data.filter((task) => {
				if (task.completed) {
					return true;
				}
				return false;
			});
		} else if (filter === "Pending") {
			console.log("Pending filter");
			taskArray = response.data.filter((task) => {
				if (!task.completed) {
					return true;
				}
				return false;
			});
		}
		console.log("All filter");

		setTasks((prevState) => {
			const ps = { ...prevState };
			ps.tasks = response.data;
			ps.taskComponents = taskArray.map(mapTask);
			return ps;
		});
	};

	const mapTask = (aTask) => {
		return <Task task={aTask} key={"Task-" + aTask.id} openForm={openForm} handleDelete={handleDelete} handleUpdate={handleUpdate} />;
	};

	const openForm = (aTask) => {
		console.log(aTask);
		if (aTask.id > 0) {
			setTaskInfo((prevState) => {
				const ps = { ...prevState };
				ps.id = aTask.id;
				ps.title = aTask.title;
				ps.completed = aTask.completed;
				return ps;
			});
		} else {
			setTaskInfo(defaultTaskInfo);
		}
		setModalShow(true);
	};

	const handleUpdate = (aTask) => {
		console.log(aTask);
		tasksService.update(aTask.id, aTask.title, !aTask.completed).then(onUpdateSuccess).catch(onServiceError);
	};

	const onUpdateSuccess = (response) => {
		console.log("success", response);
		if (response.data.completed) {
			Swal.fire({
				icon: "success",
				title: "Great Job!",
				showConfirmButton: false,
			});
		}
		getTasks();
	};

	const handleDelete = (id) => {
		console.log(id);
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				tasksService.destroy(id).then(onDeleteSuccess).catch(onServiceError);
			}
		});
	};
	const onDeleteSuccess = (response) => {
		console.log("success", response);
		getTasks();
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

	const onServiceError = (err) => {
		console.log("error", err);
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
			<TaskModal show={modalShow} hide={() => setModalShow(false)} task={taskInfo} getTasks={getTasks} />
		</>
	);
}

export default Tasks;
