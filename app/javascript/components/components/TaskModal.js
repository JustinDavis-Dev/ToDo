import React from "react";
import Modal from "react-bootstrap/Modal";
import TaskForm from "../components/TaskForm";

function TaskModal(props) {
	const aTask = props.task;

	const getTasks = () => {
		props.hide();
		props.getTasks();
	};
	return (
		<Modal show={props.show} onHide={props.hide} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title>{aTask.id ? "Edit Task" : "Add Task"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row justify-content-center">
					<div className="col-8">
						<TaskForm task={aTask} getTasks={getTasks} />
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default TaskModal;
