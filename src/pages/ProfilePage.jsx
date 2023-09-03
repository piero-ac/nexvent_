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

const Profile = () => {
	const { user } = useAuth();
	const [createdEvents, setCreatedEvents] = useState([]);

	useEffect(() => {
		const getCreatedEvents = async () => {
			try {
				const response = await db.listDocuments(
					NEXVENT_DB_ID,
					NEXVENT_EVENTS_COL_ID,
					[Query.equal("createdBy", user.$id)]
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
		<div className="container">
			<h1>Welcome {user.name}!</h1>
			<h2>Created Events</h2>
			{createdEvents.length === 0 && <p>None so far...</p>}
			{createdEvents.length > 0 &&
				createdEvents.map((event) => (
					<div key={event.$id}>
						<img width={100} src={event.imageURL} alt={event.eventTitle} />
						<p>{event.eventTitle}</p>
					</div>
				))}
			<h2>Events you are attending</h2>
		</div>
	);
};

export default Profile;
