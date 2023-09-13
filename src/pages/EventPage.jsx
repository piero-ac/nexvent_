import { useNavigate, useParams } from "react-router-dom";
import classes from "../styling/EventPage.module.css";
import clockSvg from "../assets/clock-svgrepo-com.svg";
import locationSvg from "../assets/location-pin-alt-1-svgrepo-com.svg";
import { formatISO1086 } from "../utils/formatISO1086";
import { useEffect, useState } from "react";
import {
	db,
	storage,
	NEXVENT_DB_ID,
	NEXVENT_EVENTS_COL_ID,
	NEXVENT_BUCKET_ID,
} from "../appwriteConfig";
import { Query } from "appwrite";

const Event = () => {
	const { eventId } = useParams();
	const navigate = useNavigate();
	const [event, setEvent] = useState([]);
	const [notFound, setNotFound] = useState(false);

	if (event) {
		const dateTime = formatISO1086(event.eventDateTime);
		console.log(dateTime);
	}

	useEffect(() => {
		// Fetch event by eventId
		const getEvent = async () => {
			try {
				const response = await db.listDocuments(
					NEXVENT_DB_ID,
					NEXVENT_EVENTS_COL_ID,
					[Query.equal("$id", eventId)]
				);
				console.log(response);
				if (response.total === 0) {
					setNotFound(true);
					return;
				}

				// Fetch Event Image from Storage
				const eventInfo = response.documents[0];
				const fileId = eventInfo.eventImage;
				const file = await storage.getFileView(NEXVENT_BUCKET_ID, fileId);
				eventInfo.imageURL = file.href;

				// Fetch Number of Attendees

				setEvent(eventInfo);
			} catch (err) {
				console.error(err);
				setNotFound(true);
			}
		};

		getEvent();
	}, [eventId]);

	if (notFound) {
		return <h1>Event Information Could Not Be Found</h1>;
	}

	return (
		<main className={classes.main}>
			<div className={classes.back}>
				<button onClick={() => navigate("..")}>Back</button>
			</div>
			<header className={classes.header}>
				<h1>{event.eventTitle}</h1>
				<p>Hosted By {event.eventCreatorName}</p>
			</header>

			<section className={classes.event}>
				<article className={classes.details}>
					<div className={classes.event_image}>
						<img src={event.imageURL} />
					</div>
					<div className={classes.event_description}>
						<h2>Description</h2>
						<p>{event.eventDescription}</p>
					</div>
					<div className={classes.event_description}>
						<h2>Additional Information</h2>
						<p>{event.eventAdditionalInfo}</p>
					</div>
					<div className={classes.event_description}>
						<h2>Attendees</h2>
						<p>1 Attendees</p>
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
								<span className={classes.time_item_title}>
									{formatISO1086(event.eventDateTime).date}
								</span>
							</p>
							<p>{formatISO1086(event.eventDateTime).time}</p>
						</div>
					</div>
					<div className={classes.time_item}>
						<div>
							<img src={locationSvg} width={40} />
						</div>
						<div>
							<p>
								<span className={classes.time_item_title}>
									{event.eventType === "online"
										? "Online Event"
										: "In Person Event"}
								</span>
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

export default Event;
