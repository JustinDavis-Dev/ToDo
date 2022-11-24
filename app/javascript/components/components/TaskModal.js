import React from "react";
import Modal from "react-bootstrap/Modal";

function TaskModal(props) {
	const aTask = props.task;
	console.log(aTask);
	return (
		<Modal show={props.show} onHide={props.hide} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title>{aTask.id ? "Edit Task" : "Add Task"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row"></div>
			</Modal.Body>
		</Modal>
	);
}

export default TaskModal;
