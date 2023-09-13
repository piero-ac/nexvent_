import { json, useLoaderData } from "react-router-dom";
import classes from "../styling/EventsPage.module.css";
import FiltersForm from "../components/FiltersForm";
import EventItem from "../components/EventItem";
import { db, NEXVENT_DB_ID, NEXVENT_EVENTS_COL_ID } from "../appwriteConfig";
import { Query } from "appwrite";

const Events = () => {
	const data = useLoaderData();

	return (
		<main className={classes.main}>
			<h1>
				<span>{data.total}</span> events waiting for you!
			</h1>
			<FiltersForm />
			<section className={classes.events}>
				{data.documents.map((event) => (
					<EventItem event={event} key={event.$id} />
				))}
			</section>
		</main>
	);
};

export async function loader() {
	const response = await db.listDocuments(
		NEXVENT_DB_ID,
		NEXVENT_EVENTS_COL_ID,
		[Query.limit(10), Query.orderDesc("eventDateTime")]
	);

	return json(response);
}

export default Events;
