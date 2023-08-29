import { json, useLoaderData } from "react-router-dom";
import classes from "../styling/EventsPage.module.css";
import FiltersForm from "../components/FiltersForm";
import EventItem from "../components/EventItem";

const Events = () => {
	const data = useLoaderData();

	return (
		<main className={classes.main}>
			<h1>
				<span>{data.events.length}</span> events waiting for you!
			</h1>
			<FiltersForm />
			<section className={classes.events}>
				{data.events.map((event) => (
					<EventItem event={event} key={event.document_id} />
				))}
			</section>
		</main>
	);
};

export async function loader() {
	const response = await fetch("http://localhost:3000/events");
	if (!response.ok) {
		throw json({ message: "Could not fetch events." }, { status: 500 });
	} else {
		return response;
	}
}

export default Events;
