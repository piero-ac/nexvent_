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
	const [eventCategories, setEventCategories] = useState([]);
	const { user } = useAuth();

	const onOptionChange = (e) => {
		setEventType(e.target.value);
	};

	const onCheckboxChange = (e) => {
		if (e.target.checked) {
			setEventCategories((prevCategories) => [
				...prevCategories,
				e.target.value,
			]);
		} else {
			setEventCategories((prevCategories) =>
				prevCategories.filter((category) => category !== e.target.value)
			);
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const eventTitle = form.current.eventTitle.value;
		const eventDescription = form.current.eventDescription.value;
		const eventType = form.current.eventType.value;
		const eventDateTime = form.current.eventDateTime.value;
		const eventLocation =
			eventType === "online" ? "NA" : form.current.eventLocation.value;
		const eventAdditionalInfo =
			form.current.eventAdditionalInfo.value.trim() || "NA";
		const eventImage = document.getElementById("eventImage").files[0];

		if (eventImage === undefined) {
			console.error("No image selected");
			return;
		}

		const eventData = {
			eventTitle,
			eventDescription,
			eventType,
			eventCategory: eventCategories,
			eventDateTime,
			eventLocation,
			eventAdditionalInfo,
			eventImage,
			eventCreatorName: user.name,
			createdBy: user.$id,
		};

		console.log(eventData);

		// try {
		// 	// Store Event Image
		// 	const fileResponse = await storage.createFile(
		// 		NEXVENT_BUCKET_ID,
		// 		ID.unique(),
		// 		eventImage
		// 	);
		// 	// console.log(fileResponse);

		// 	// Create document for event
		// 	const eventResponse = await db.createDocument(
		// 		NEXVENT_DB_ID,
		// 		NEXVENT_EVENTS_COL_ID,
		// 		ID.unique(),
		// 		{ ...eventData, eventImage: fileResponse.$id }
		// 	);

		// 	// Create document for event attendees
		// 	const attendeesResponse = await db.createDocument(
		// 		NEXVENT_DB_ID,
		// 		NEXVENT_EVENT_ATTENDEES_COL_ID,
		// 		ID.unique(),
		// 		{ eventId: eventResponse.$id, attendees: [user.$id] }
		// 	);

		// 	// Update eventAttendees attribute in created event document
		// 	await db.updateDocument(
		// 		NEXVENT_DB_ID,
		// 		NEXVENT_EVENTS_COL_ID,
		// 		eventResponse.$id,
		// 		{ eventAttendees: attendeesResponse.$id }
		// 	);

		// 	// console.log("RESPONSE", response);
		// 	form.current.reset();
		// 	// alert(`Your Event: "${eventTitle}" has been created! `);
		// 	navigate(`/event/${eventResponse.$id}`);
		// } catch (err) {
		// 	console.error(err);
		// 	// Check which of the responses failed
		// 	// and delete up to that response the document that wascreated for it
		// }
	};

	return (
		<div className={classes.new_event}>
			<h1>What are you planning?</h1>
			<form
				ref={form}
				className={classes.new_event_form}
				onSubmit={handleFormSubmit}
			>
				<label htmlFor="eventTitle">
					Title <span className={classes.red}>*</span>
				</label>
				<input
					id="eventTitle"
					name="eventTitle"
					type="text"
					max={50}
					required
				/>
				<label htmlFor="eventDescription">
					Description <span className={classes.red}>*</span>
				</label>
				<textarea
					id="eventDescription"
					name="eventDescription"
					max={250}
					required
				></textarea>
				<div className={classes.two_cols}>
					<fieldset>
						<legend>
							Type <span className={classes.red}>*</span>
						</legend>
						<input
							type="radio"
							id="eventOnline"
							name="eventType"
							value="online"
							defaultChecked={eventType === "online"}
							onChange={onOptionChange}
						/>

						<label htmlFor="eventOnline">Online</label>
						<br />
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
							onChange={onCheckboxChange}
						/>
						<label htmlFor="hobbies_passions">Hobbies & Passions</label>
						<br />
						<input
							type="checkbox"
							name="eventCategory"
							value="technology"
							onChange={onCheckboxChange}
						/>
						<label htmlFor="technology">Technology</label>
						<br />
						<input
							type="checkbox"
							name="eventCategory"
							value="career_business"
							onChange={onCheckboxChange}
						/>
						<label htmlFor="career_business">Career & Business</label>
					</fieldset>
				</div>

				<label htmlFor="eventDateTime">
					Date and Time <span className={classes.red}>*</span>
				</label>
				<input
					type="datetime-local"
					id="eventDateTime"
					name="eventDateTime"
					required
				/>
				<fieldset
					className={classes.event_information}
					name="eventLocation"
					disabled={eventType === "online"}
					style={{ display: eventType === "online" ? "none" : "block" }}
				>
					<legend>Location</legend>
					<div className={classes.address_line}>
						<label htmlFor="address-1">
							Address Line 1 <span className={classes.red}>*</span>
						</label>
						<input type="text" name="address-1" id="address-1" required />
					</div>
					<div className={classes.address_line}>
						<label htmlFor="address-2">Address Line 2</label>
						<input type="text" name="address-2" id="address-2" />
					</div>
					<div className={classes.address_line}>
						<label htmlFor="city">
							City <span className={classes.red}>*</span>
						</label>
						<input type="text" name="city" id="city" required />
					</div>
					<div className={classes.address_line}>
						<label htmlFor="state">
							State <span className={classes.red}>*</span>
						</label>
						<select name="state" id="state">
							<option value="NJ">New Jersey (NJ)</option>
						</select>
					</div>
					<div className={classes.address_line}>
						<label htmlFor="zipcode">
							Postal Code <span className={classes.red}>*</span>
						</label>
						<input
							type="text"
							name="zipcode"
							id="zipcode"
							placeholder="XXXXX or XXXXX-XXXX"
							required
						/>
					</div>
				</fieldset>
				<label htmlFor="eventAdditionalInfo">Additional Information</label>
				<textarea
					id="eventAdditionalInfo"
					name="eventAdditionalInfo"
					maxLength={250}
					placeholder="(Ticketing, Event Duration, etc.)"
				></textarea>
				<label htmlFor="eventImage">
					Upload Event Image (Max 5MB) (PNG, JPG, JPEG){" "}
					<span className={classes.red}>*</span>
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
