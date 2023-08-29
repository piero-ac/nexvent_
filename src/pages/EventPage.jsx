import { useNavigate, json, useLoaderData } from "react-router-dom";
import classes from "../styling/EventPage.module.css";
import clockSvg from "../assets/clock-svgrepo-com.svg";
import locationSvg from "../assets/location-pin-alt-1-svgrepo-com.svg";
import formatTimestamp from "../utils/formatTimestamp";

const Event = () => {
	const navigate = useNavigate();
	const data = useLoaderData();
	const { event } = data;
	const { date, time } = formatTimestamp(event.event_date);
	return (
		<main className={classes.main}>
			<div className={classes.back}>
				<button onClick={() => navigate("/events")}>Back</button>
			</div>
			<header className={classes.header}>
				<h1>{event.event_name}</h1>
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
						<p>{event.event_description}</p>
					</div>
					<div className={classes.event_description}>
						<h2>Attendees</h2>
						<p>{event.number_of_attendees} Attendees</p>
						{/** Include some attendees icons */}
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
								<span className={classes.time_item_title}>{date}</span>
							</p>
							<p>{time}</p>
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

export async function loader({ params }) {
	const { eventId } = params;
	const response = await fetch("http://localhost:3000/event/" + eventId);
	if (!response.ok) {
		throw json({ message: "Could not fetch events." }, { status: 500 });
	} else {
		return response;
	}
}
export default Event;
