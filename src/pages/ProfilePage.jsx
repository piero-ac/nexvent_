import { useAuth } from "../utils/AuthContext";
import {
	db,
	storage,
	NEXVENT_DB_ID,
	NEXVENT_EVENTS_COL_ID,
	NEXVENT_BUCKET_ID,
} from "../appwriteConfig";
import { Query } from "appwrite";
import { useState, useEffect } from "react";
import classes from "../styling/ProfilePage.module.css";
import UserSVG from "../assets/user.svg";
import { formatISO1086 } from "../utils/formatISO1086";

const Profile = () => {
	const { user } = useAuth();
	const [createdEvents, setCreatedEvents] = useState([]);

	useEffect(() => {
		// Fetch Events Created By User
		const getCreatedEvents = async () => {
			try {
				const response = await db.listDocuments(
					NEXVENT_DB_ID,
					NEXVENT_EVENTS_COL_ID,
					[
						Query.equal("createdBy", user.$id),
						Query.greaterThanEqual("eventDateTime", new Date().toISOString()),
						Query.limit(5),
					]
				);
				// console.log("Created Events", response);
				const eventsWithImages = await Promise.all(
					response.documents.map(async (event) => {
						const fileId = event.eventImage;
						const file = await storage.getFileView(NEXVENT_BUCKET_ID, fileId);
						// console.log(file);
						event.imageURL = file.href;
						return event;
					})
				);
				// console.log(eventsWithImages);
				setCreatedEvents(eventsWithImages);
			} catch (err) {
				console.error(err);
			}
		};
		getCreatedEvents();
	}, []);

	return (
		<main className={classes.main}>
			<div className={classes.profile_info}>
				<section className={classes.profile}>
					<div className={classes.profile_img_container}>
						<img src={UserSVG} />
					</div>
					<div className={classes.profile_userinfo_container}>
						<div>
							<p>{user.name}</p>
							<p>{user.email}</p>
							<p>Member since {formatISO1086(user.$createdAt, "short")}</p>
						</div>
						<button className={classes.edit_btn}>Edit Profile</button>
					</div>
				</section>
				<section className={classes.events}>
					<h2>Upcoming Events</h2>
					{createdEvents.length === 0 && (
						<p className={classes.no_events}>None so far...</p>
					)}
					{createdEvents.length > 0 &&
						createdEvents.map((event) => (
							<div key={event.$id} className={classes.event_item}>
								<div className={classes.event_item_img}>
									<img
										width={100}
										src={event.imageURL}
										alt={event.eventTitle}
									/>
								</div>
								<div className={classes.event_item_info}>
									<p>{event.eventTitle}</p>
									<p>{formatISO1086(event.eventDateTime, "full")}</p>
								</div>
							</div>
						))}
				</section>
			</div>
		</main>
	);
};

export default Profile;
