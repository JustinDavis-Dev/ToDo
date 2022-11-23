import React from "react";

function Task(props) {
	console.log(props);
	return (
		<div>
			<p>{props.title}</p>
			<p>{props.completed.toString()}</p>
			<p>{props.id}</p>
		</div>
	);
}

export default Task;
