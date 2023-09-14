import { Link } from "react-router-dom";
import classes from "../styling/MainNavigation.module.css";
import { useAuth } from "../utils/AuthContext";

const MainNavigation = () => {
	const { user, logoutUser } = useAuth();

	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarBrand}>
				<Link to="/">Nexvent</Link>
			</div>
			<div className={classes.navbarLinks}>
				{user ? (
					<>
						<Link to="/events">Events</Link>
						<Link to="/new">New</Link>
						<Link to="/profile">Profile</Link>
						<button onClick={logoutUser}>Logout</button>
					</>
				) : (
					<Link to="/login">Log In</Link>
				)}
			</div>
		</nav>
	);
};

export default MainNavigation;
