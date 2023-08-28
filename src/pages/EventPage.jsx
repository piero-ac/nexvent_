import { useParams, useNavigate } from "react-router-dom";
import classes from "../styling/EventPage.module.css";
import clockSvg from "../assets/clock-svgrepo-com.svg";
import locationSvg from "../assets/location-pin-alt-1-svgrepo-com.svg";

const Event = () => {
	const navigate = useNavigate();
	const { eventId } = useParams();
	return (
		<main className={classes.main}>
			<div className={classes.back}>
				<button onClick={() => navigate("/events")}>Back</button>
			</div>
			<header className={classes.header}>
				<h1>{eventId}</h1>
				<p>Hosted By</p>
				<p>TBD</p>
			</header>

			<section className={classes.event}>
				<article className={classes.details}>
					<div className={classes.event_image}>
						<img src="https://picsum.photos/1920/1080" />
					</div>
					<div className={classes.event_description}>
						<h2>Description</h2>
						<p>
							Make real friends without needing to go out, buy drinks, or come
							up with things to talk about! Event Zoom link will be shared via
							email, so don&apos;t forget to subscribe to Meetup event
							notifications! We&apos;ll do our best to connect you with people
							in your area.
						</p>
						<p>
							<span className={classes.event_duration}>Duration 90 mins</span>
						</p>
					</div>
					<div className={classes.event_description}>
						<h2>Attendees</h2>
						<p>90 people attending</p>
						{/* <div className={classes.user_icons}>

            </div> */}
					</div>
					<div className={classes.event_signup}>
						<button>Attend</button>
					</div>
				</article>
				<article className={classes.event_time}>
					<div className={classes.time_item}>
						<div>
							<img src={clockSvg} width={40} />
						</div>
						<div>
							<p>
								<span className={classes.time_item_title}>
									Thursday, Sep 7, 2023
								</span>
							</p>
							<p>12:00 PM</p>
						</div>
					</div>
					<div className={classes.time_item}>
						<div>
							<img src={locationSvg} width={40} />
						</div>
						<div>
							<p>
								<span className={classes.time_item_title}>Online Event</span>
							</p>
							<p>Link visible for attendees</p>
						</div>
					</div>
					<div className={classes.event_signup}>
						<button>Attend</button>
					</div>
				</article>
			</section>
		</main>
	);
};

export default Event;
