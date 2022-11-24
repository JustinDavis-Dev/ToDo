import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navigation = ({ logged_in, current_user, new_user_route, sign_in_route, sign_out_route }) => {
	console.log("logged_in:", logged_in);
	console.log("current_user:", current_user);
	console.log("new_user_route:", new_user_route);
	console.log("sign_in_route:", sign_in_route);
	console.log("sign_out_route:", sign_out_route);
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<NavLink to="/" className="nav-link">
					<Navbar.Brand>ToDo</Navbar.Brand>
				</NavLink>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{logged_in ? (
							<>
								<NavLink to="/about" className="nav-link">
									About
								</NavLink>
								<Nav.Link href={sign_out_route}>Log Out</Nav.Link>
							</>
						) : (
							<>
								<Nav.Link href={new_user_route}>Sign Up</Nav.Link>
								<Nav.Link href={sign_in_route}>Log In</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
