import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navigation = ({ logged_in, current_user, new_user_route, sign_in_route, sign_out_route }) => {
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
								<span className="align-self-center me-2">Welcome! {current_user.email}</span>
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
