import React from "react";
import { Card } from "react-bootstrap";
import { FaEdit, FaRegTrashAlt, FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

function Task(props) {
	console.log(props);
	const aTask = props;
	const openForm = () => {
		props.openForm(props.id);
	};

	const handleDelete = () => {
		props.handleDelete(props.id);
	};

	return (
		<Card body className="my-1">
			<div className="d-flex align-items-center">
				<div className="flex-shrink-0 me-2">
					{aTask.completed ? (
						<button className="btn d-flex">
							<FaRegCheckCircle />
						</button>
					) : (
						<button className="btn d-flex">
							<FaRegCircle />
						</button>
					)}
				</div>
				<div className="flex-grow-1">
					<h5 className={`d-flex my-0 ${aTask.completed ? "text-decoration-line-through" : ""}`}>{props.title}</h5>
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
