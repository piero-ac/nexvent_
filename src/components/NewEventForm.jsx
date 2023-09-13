import { useRef, useState } from "react";
import classes from "../styling/NewEventForm.module.css";
import { useAuth } from "../utils/AuthContext";
import {
	db,
	storage,
	NEXVENT_DB_ID,
	NEXVENT_EVENTS_COL_ID,
	NEXVENT_BUCKET_ID,
	NEXVENT_EVENT_ATTENDEES_COL_ID,
} from "../appwriteConfig";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";

const NewEventForm = () => {
	const navigate = useNavigate();
	const form = useRef(null);
	const [eventType, setEventType] = useState("online");
	const { user } = useAuth();

	const onOptionChange = (e) => {
		setEventType(e.target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const eventTitle = form.current.eventTitle.value;
		const eventDescription = form.current.eventDescription.value;
		const eventType = form.current.eventType.value;
		const checkboxes = form.current.querySelectorAll(
			'input[type="checkbox"]:checked'
		);
		const eventCategory = Array.from(checkboxes).map(
			(checkbox) => checkbox.value
		);
		const eventDateTime = form.current.eventDateTime.value;
		const eventLocation = form.current.eventLocation.value || "NA";
		const eventAdditionalInfo = form.current.eventAdditionalInfo.value || "NA";
		const eventImage = document.getElementById("eventImage").files[0];

		const eventData = {
			eventTitle,
			eventDescription,
			eventType,
			eventCategory,
			eventDateTime,
			eventLocation,
			eventAdditionalInfo,
			eventImage,
			eventCreatorName: user.name,
			createdBy: user.$id,
		};

		console.log(eventData);

		try {
			// Store Event Image
			const fileResponse = await storage.createFile(
				NEXVENT_BUCKET_ID,
				ID.unique(),
				eventImage
			);
			// console.log(fileResponse);

			// Create document for event
			const eventResponse = await db.createDocument(
				NEXVENT_DB_ID,
				NEXVENT_EVENTS_COL_ID,
				ID.unique(),
				{ ...eventData, eventImage: fileResponse.$id }
			);

			// Create document for event attendees
			const attendeesResponse = await db.createDocument(
				NEXVENT_DB_ID,
				NEXVENT_EVENT_ATTENDEES_COL_ID,
				ID.unique(),
				{ eventId: eventResponse.$id, attendees: [user.$id] }
			);

			// Update eventAttendees attribute in created event document
			await db.updateDocument(
				NEXVENT_DB_ID,
				NEXVENT_EVENTS_COL_ID,
				eventResponse.$id,
				{ eventAttendees: attendeesResponse.$id }
			);

			// console.log("RESPONSE", response);
			form.current.reset();
			// alert(`Your Event: "${eventTitle}" has been created! `);
			navigate(`/event/${eventResponse.$id}`);
		} catch (err) {
			console.error(err);
			// Check which of the responses failed
			// and delete up to that response the document that wascreated for it
		}
	};

	return (
		<div className={classes.new_event}>
			<h1>What are you planning?</h1>
			<form
				ref={form}
				className={classes.new_event_form}
				onSubmit={handleFormSubmit}
			>
				<label htmlFor="eventTitle">Title</label>
				<input
					id="eventTitle"
					name="eventTitle"
					type="text"
					max={50}
					required
				/>
				<label htmlFor="eventDescription">Description</label>
				<textarea
					id="eventDescription"
					name="eventDescription"
					max={250}
					required
				></textarea>
				<fieldset>
					<legend>Type</legend>
					<input
						type="radio"
						id="eventOnline"
						name="eventType"
						value="online"
						defaultChecked={eventType === "online"}
						onChange={onOptionChange}
					/>
					<label htmlFor="eventOnline">Online</label>
					<input
						type="radio"
						id="eventInperson"
						name="eventType"
						value="inperson"
						onChange={onOptionChange}
					/>
					<label htmlFor="eventInperson">In-Person</label>
				</fieldset>
				<fieldset>
					<legend>Categories</legend>
					<input
						type="checkbox"
						name="eventCategory"
						value="hobbies_passions"
					/>
					<label htmlFor="hobbies_passions">Hobbies & Passions</label>
					<br />
					<input type="checkbox" name="eventCategory" value="technology" />
					<label htmlFor="technology">Technology</label>
					<br />
					<input type="checkbox" name="eventCategory" value="career_business" />
					<label htmlFor="career_business">Career & Business</label>
				</fieldset>
				<label htmlFor="eventDateTime">Date and Time</label>
				<input
					type="datetime-local"
					id="eventDateTime"
					name="eventDateTime"
					required
				/>
				<label htmlFor="eventLocation">Location</label>
				<input
					type="text"
					id="eventLocation"
					name="eventLocation"
					disabled={eventType === "online"}
					required
				/>
				<label htmlFor="eventAdditionalInfo">
					Additional Information (Ticketing, Event Duration, etc.)
				</label>
				<textarea
					id="eventAdditionalInfo"
					name="eventAdditionalInfo"
					maxLength={250}
				></textarea>
				<label htmlFor="eventImage">
					Upload Event Image (Max 5MB) (PNG, JPG, JPEG)
				</label>
				<input
					type="file"
					id="eventImage"
					name="eventImage"
					accept=".jpg,.png,.jpeg"
					required
				/>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default NewEventForm;
