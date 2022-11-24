import React, { useEffect, useState } from "react";
import tasksService from "../services/tasksService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const validationSchema = Yup.object().shape({
	title: Yup.string().min(2).max(255).required("Required"),
});

function TaskForm(props) {
	const [formData, setFormData] = useState({ id: "", title: "", completed: false });

	console.log(props);

	useEffect(() => {
		if (props.task.id) {
			setFormData(props.task);
		}
	}, []);

	const handleSubmit = (values) => {
		console.log(values);
		if (values.id) {
			tasksService.update(values.id, values.title, values.completed).then(onUpdateSuccess).catch(onServiceError);
		} else {
			tasksService.add(values.title).then(onAddSuccess).catch(onServiceError);
		}
	};

	// const addTask = (text) => {
	// 	console.log(text);
	// 	// tasksService.add(text).then(onAddSuccess).catch(onServiceError);
	// 	// axios
	// 	// 	.post(`/api/tasks?task[title]=${text}&task[completed]=false`)
	// 	// 	.then((res) => console.log(res, "success"))
	// 	// 	.catch((err) => console.log(err));
	// };

	const onAddSuccess = (response) => {
		console.log(response);
		Swal.fire({
			icon: "success",
			title: "Successfully Added Task!",
			showConfirmButton: false,
		});
		props.getTasks();
	};

	const onUpdateSuccess = (response) => {
		console.log(response);
		Swal.fire({
			icon: "success",
			title: "Successfully Updated Task!",
			showConfirmButton: false,
		});
		props.getTasks();
	};

	const onServiceError = (err) => {
		console.log("error", err);
	};

	return (
		// <form onSubmit={handleSubmit}>
		// 	<input type="text" name="title" value={text.title} onChange={onFormFieldChange} />
		// 	<button type="submit">Add Task</button>
		// </form>
		<Formik enableReinitialize={true} initialValues={formData} onSubmit={handleSubmit} validationSchema={validationSchema}>
			<Form className="mt-2">
				<div className="form-group">
					<Field type="text" name="title" className="form-control" />
					<ErrorMessage name="title" component="div" className="has-error" />
				</div>
				{props.task.id ? (
					<div className="form-check mt-2">
						<Field type="checkbox" name="completed" className="form-check-input" />
						<label htmlFor="completed" className="form-check-label">
							Completed
						</label>
					</div>
				) : null}

				<button type="submit" className="btn btn-primary mt-2 w-100 mt-2">
					Submit
				</button>
			</Form>
		</Formik>
	);
}

export default TaskForm;
