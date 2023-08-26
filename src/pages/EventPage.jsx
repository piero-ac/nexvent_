import { useParams } from "react-router-dom";
import classes from "../styling/EventPage.module.css";
import clockSvg from "../assets/clock-svgrepo-com.svg";
import locationSvg from "../assets/location-pin-alt-1-svgrepo-com.svg";
const Event = () => {
	const { eventId } = useParams();
	return (
		<main className={classes.main}>
			<header className={classes.header}>
				<h1>{eventId}</h1>
				<p>Hosted By</p>
				<p>TBD</p>
			</header>

			<section className={classes.event}>
				<article className={classes.details}>
					<div>
						<img src="https://picsum.photos/200" />
					</div>
					<div>
						<h2>Details</h2>
						<p>
							Make real friends without needing to go out, buy drinks, or come
							up with things to talk about!
						</p>
						<p>
							Event Zoom link will be shared via email, so don&apos;t forget to
							subscribe to Meetup event notifications!
						</p>
						<p>
							We&apos;ll do our best to connect you with people in your area*
						</p>
						<p>Duration 90 mins</p>
					</div>
				</article>
				<article className={classes.event_time}>
					<div className={classes.time_item}>
						<div>
							<img src={clockSvg} width={40} />
						</div>
						<div>
							<p>Thursday, Sep 7, 2023</p>
							<p>12:00 PM</p>
						</div>
					</div>
					<div className={classes.time_item}>
						<div>
							<img src={locationSvg} width={45} />
						</div>
						<div>
							<p>Online Event</p>
							<p>Link visible for attendees</p>
						</div>
					</div>
				</article>
			</section>
		</main>
	);
};

export default Event;
