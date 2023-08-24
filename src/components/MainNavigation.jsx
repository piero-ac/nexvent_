import { Link } from "react-router-dom";
import classes from "../styling/MainNavigation.module.css";

const MainNavigation = () => {
	return (
		<nav className={classes.navbar}>
			<div className={classes.navbarBrand}>
				<Link to="/">Nexvent</Link>
			</div>
			<div className={classes.navbarLinks}>
				<Link to="/events">All Events</Link>
				<Link to="/login">Log In</Link>
			</div>
		</nav>
	);
};

export default MainNavigation;
