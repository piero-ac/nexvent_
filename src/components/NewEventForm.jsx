import { useRef, useState } from "react";
import classes from "../styling/NewEventForm.module.css";

const NewEventForm = () => {
	const form = useRef(null);
	const [eventType, setEventType] = useState("online");

	const onOptionChange = (e) => {
		setEventType(e.target.value);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const eventTitle = form.current.eventTitle.value;
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
					<input type="checkbox" name="hobbies_passions" />
					<label htmlFor="hobbies_passions">Hobbies & Passions</label>
					<br />
					<input type="checkbox" name="technology" />
					<label htmlFor="technology">Technology</label>
					<br />
					<input type="checkbox" name="career_business" />
					<label htmlFor="career_business">Career & Business</label>
				</fieldset>
				<label htmlFor="eventDateTime">Date and Time</label>
				<input type="datetime-local" id="eventDateTime" name="eventDateTime" />
				<label htmlFor="eventLocation">Location</label>
				<input
					type="text"
					id="eventLocation"
					name="eventLocation"
					disabled={eventType === "online"}
				/>
				<label htmlFor="eventAdditionalInfo">
					Additional Information (Ticketing, Event Duration, etc.)
				</label>
				<textarea
					id="eventAdditionalInfo"
					name="eventAdditionalInfo"
				></textarea>
				<label htmlFor="eventImage">Event Image (imgur links only)</label>
				<input type="text" id="eventImage" name="eventImage" />
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default NewEventForm;