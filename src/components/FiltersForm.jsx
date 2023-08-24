import classes from "../styling/FiltersForm.module.css";

const FiltersForm = () => {
	return (
		<section className={classes.filters}>
			<form>
				<select>
					<option value="all-types">Any type</option>
					<option value="online">Online</option>
					<option value="in-person">In Person</option>
				</select>
				<select>
					<option value="all-distances">Any distance</option>
					<option value="2">2 miles</option>
					<option value="5">5 miles</option>
					<option value="10">10 miles</option>
					<option value="25">25 miles</option>
				</select>
				<select>
					<option value="all-categories">Any category</option>
					<option value="career-business">Career & Business</option>
					<option value="hobbies-passions">Hobbies & Passion</option>
					<option value="support-coaching">Support & Coaching</option>
					<option value="technology">Technology</option>
				</select>
			</form>
		</section>
	);
};

export default FiltersForm;
