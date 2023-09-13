import NewEventForm from "../components/NewEventForm";
import classes from "../styling/NewEventPage.module.css";

const NewEvent = () => {
	return (
		<main className={classes.main}>
			<NewEventForm />
		</main>
	);
};

export default NewEvent;
