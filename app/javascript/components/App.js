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
					<Route path="/" element={<Tasks {...props} />} />
				</Routes>
			) : (
				<div className="row m-5 text-center">
					<div className="col">
						<Card body>
							<h1>Welcome!</h1>
							<h5>Log In the get started</h5>
						</Card>
					</div>
				</div>
			)}
			<Footer />
		</BrowserRouter>
	);
};

export default App;
