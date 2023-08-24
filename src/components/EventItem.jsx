/* eslint-disable react/prop-types */
import classes from "../styling/EventItem.module.css";

const EventItem = ({ event }) => {
	const title =
		event.title.length > 30
			? event.title.substring(0, 20) + "..."
			: event.title;

	return (
		<article className={classes.eventItem}>
			<div className={classes.eventImage}>
				<img
					src={"https://picsum.photos/200"}
					width="150"
					height="150"
					alt={event.imgAlt}
				/>
			</div>
			<div className={classes.eventInformation}>
				<p>{event.date}</p>
				<p>
					<span className={classes.eventTitle}>{title}</span>
				</p>
				<p>
					<span className={classes.eventLocation}>{event.location}</span>
				</p>
				<p>By {event.organizer}</p>
				<p>{event.attendees} Attendees</p>
			</div>
			<div className={classes.eventNavigate}>
				<button>Let&apos;s Go</button>
			</div>
		</article>
	);
};

export default EventItem;
