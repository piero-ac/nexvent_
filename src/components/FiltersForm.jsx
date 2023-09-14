import { useSearchParams } from "react-router-dom";
import classes from "../styling/FiltersForm.module.css";
import { useRef } from "react";

const FiltersForm = () => {
	const [, setSearchParams] = useSearchParams();
	const eventTypeSelect = useRef();
	const eventCategorySelect = useRef();

	const onChange = () => {
		const type = eventTypeSelect.current.value;
		const category = eventCategorySelect.current.value;

		setSearchParams(
			new URLSearchParams([
				["eventType", type],
				["eventCategory", category],
			])
		);
	};

	return (
		<section className={classes.filters}>
			<form onChange={onChange}>
				<div>
					Event Type{" "}
					<select name="eventType" ref={eventTypeSelect}>
						<option value="all">All</option>
						<option value="online">Online</option>
						<option value="inperson">In Person</option>
					</select>
				</div>
				<div>
					Category{" "}
					<select name="eventCategory" ref={eventCategorySelect}>
						<option value="all">All</option>
						<option value="career_business">Career & Business</option>
						<option value="hobbies_passions">Hobbies & Passion</option>
						<option value="support_coaching">Support & Coaching</option>
						<option value="technology">Technology</option>
					</select>
				</div>
			</form>
		</section>
	);
};

export default FiltersForm;
