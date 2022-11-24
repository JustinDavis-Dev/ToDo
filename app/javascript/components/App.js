import React from "react";
import { Card } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Tasks from "./pages/Tasks";

const App = (props) => {
	return (
		<BrowserRouter>
			<Navigation {...props} />
			{props.logged_in ? (
				<Routes>
					<Route path="/" element={<Tasks />} />
				</Routes>
			) : (
				<div className="row m-5 text-center">
					<div className="col">
						<Card body>
							<h1>Welcome!</h1>
							<h6>
								To use the ToDo app,{" "}
								<a className="text-decoration-none" href={props.new_user_route}>
									Sign Up
								</a>{" "}
								to view your unique list or use our test account to try it out first.
							</h6>
							<p className="mt-2">
								Test Account
								<br />
								Email: test@test.com
								<br />
								Password: password
							</p>
						</Card>
					</div>
				</div>
			)}
			<Footer />
		</BrowserRouter>
	);
};

export default App;
