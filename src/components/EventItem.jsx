/* eslint-disable react/prop-types */
import classes from "../styling/EventItem.module.css";
import { useNavigate } from "react-router-dom";
import formatTimestamp from "../utils/formatTimestamp";

const EventItem = ({ event }) => {
	const navigate = useNavigate();

	const title =
		event.event_name.length > 25
			? event.event_name.substring(0, 20) + "..."
			: event.event_name;

	return (
		<article className={classes.eventItem}>
			<div className={classes.eventImage}>
				<img
					src={event.event_image}
					width="150"
					height="150"
					alt={event.imgAlt}
				/>
			</div>
			<div className={classes.eventInformation}>
				<p>{formatTimestamp(event.event_date)}</p>
				<p>
					<span className={classes.eventTitle}>{title}</span>
				</p>
				<p>
					<span
						className={classes.eventLocation}
					>{`${event.address.city.stringValue}, ${event.address.state.stringValue}`}</span>
				</p>
				<p>By TBD</p>
				<p>{event.number_of_attendees} Attendees</p>
			</div>
			<div className={classes.eventNavigate}>
				<button onClick={() => navigate(`/event/${event.document_id}`)}>
					Let&apos;s Go
				</button>
			</div>
		</article>
	);
};

export default EventItem;
