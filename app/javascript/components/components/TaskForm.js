import React, { useState } from "react";
import axios from "axios";

function TaskForm(props) {
	const [text, setText] = useState({ title: "", completed: false, user_id: 0 });
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log({ text, props });
		addTask(text);
	};
	const addTask = (text) => {
		const payload = { title: text, completed: false, user_id: props.current_user.id };
		console.log(payload);
		axios
			.post(`/api/tasks?task[title]=${text}&task[completed]=false`)
			.then((res) => console.log(res, "success"))
			.catch((err) => console.log(err));
	};
	return (
		<form onSubmit={handleSubmit}>
			<p>text</p>
			<input value={text.title} onChange={(e) => setText(e.target.value)} />
			<button type="submit">add</button>
		</form>
	);
}

export default TaskForm;
