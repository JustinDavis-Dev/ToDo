import React from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

const App = (props) => {
	return (
		<>
			<Header {...props} />
			{props.logged_in && <Tasks {...props} />}
		</>
	);
};

export default App;
