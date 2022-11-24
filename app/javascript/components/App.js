import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Tasks from "./pages/Tasks";

const App = (props) => {
	return (
		<BrowserRouter>
			<Navigation {...props} />
			{props.logged_in && (
				<Routes>
					<Route path="/" element={<Tasks {...props} />} />
				</Routes>
			)}
			<Footer />
		</BrowserRouter>
	);
};

export default App;
