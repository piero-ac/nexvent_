import { useAuth } from "../utils/AuthContext";
import { db, NEXVENT_DB_ID, NEXVENT_EVENTS_COL_ID } from "../appwriteConfig";
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
				console.log("Created Events", response);
				setCreatedEvents(response.documents);
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
				createdEvents.map((event) => <p key={event.$id}>{event.eventTitle}</p>)}
			<h2>Events you are attending</h2>
		</div>
	);
};

export default Profile;
