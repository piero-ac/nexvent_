/* eslint-disable react/prop-types */
import classes from "../styling/EventItem.module.css";
import { useNavigate } from "react-router-dom";
import { NEXVENT_BUCKET_ID, storage } from "../appwriteConfig";
import { useEffect, useState } from "react";
import { formatISO1086 } from "../utils/formatISO1086";

const EventItem = ({ event }) => {
	const [imageUrl, setImageUrl] = useState(null);
	const navigate = useNavigate();

	const title =
		event.eventTitle.length > 25
			? event.eventTitle.substring(0, 20) + "..."
			: event.eventTitle;

	const location =
		event.eventType === "online"
			? "Online"
			: event.eventLocation.substring(0, 20) + "...";

	useEffect(() => {
		const fetchEventImage = async () => {
			const file = await storage.getFileView(
				NEXVENT_BUCKET_ID,
				event.eventImage
			);
			setImageUrl(file.href);
		};
		fetchEventImage();
	}, []);

	return (
		<article className={classes.eventItem}>
			<div className={classes.eventImage}>
				<img src={imageUrl} width="150" height="150" alt="Event Image" />
			</div>
			<div className={classes.eventInformation}>
				<p>{formatISO1086(event.eventDateTime, "full")}</p>
				<p>
					<span className={classes.eventTitle}>{title}</span>
				</p>
				<p>
					<span className={classes.eventLocation}>{location}</span>
				</p>
				<p>By {event.eventCreatorName}</p>
				<p>1 Attendees</p>
			</div>
			<div className={classes.eventNavigate}>
				<button onClick={() => navigate(`${event.$id}`)}>Let&apos;s Go</button>
			</div>
		</article>
	);
};

export default EventItem;
