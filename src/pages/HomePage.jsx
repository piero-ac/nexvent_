import classes from "../styling/HomePage.module.css";

export default function Home() {
	return (
		<main className={classes.landingPage}>
			<div className={classes.overlay}></div>
			<section className={classes.content}>
				<div className={classes.displayText}>
					<h1>Turning Moments into Memories</h1>
					<h2>Your Local Event Planning Partner</h2>
				</div>
				<div className={classes.searchMeetups}>
					<form>
						<input type="text" placeholder="Enter your location" />
						<button type="submit">Find Events</button>
					</form>
				</div>
			</section>
		</main>
	);
}
