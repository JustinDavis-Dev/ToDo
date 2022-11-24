import React from "react";
import { Card } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt, FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

function Task(props) {
	const aTask = props.task;
	console.log(aTask);
	const openForm = () => {
		props.openForm(aTask);
	};

	const handleUpdate = () => {
		props.handleUpdate(aTask);
	};

	const handleDelete = () => {
		props.handleDelete(aTask.id);
	};

	return (
		<Card body className="my-1">
			<div className="d-flex align-items-center">
				<div className="flex-shrink-0 me-2">
					{aTask.completed ? (
						<button className="btn d-flex" onClick={handleUpdate}>
							<FaRegCheckCircle />
						</button>
					) : (
						<button className="btn d-flex" onClick={handleUpdate}>
							<FaRegCircle />
						</button>
					)}
				</div>
				<div className="flex-grow-1">
					<h5 className={`d-flex my-0 ${aTask.completed ? "text-decoration-line-through" : ""}`}>{aTask.title}</h5>
				</div>
				<button className="btn d-flex me-2" onClick={openForm}>
					<FaEdit />
				</button>
				<button className="btn d-flex" onClick={handleDelete}>
					<FaRegTrashAlt />
				</button>
			</div>
		</Card>
	);
}

export default Task;
