import classes from "../styling/EventsPage.module.css";
import FiltersForm from "../components/FiltersForm";
import EventItem from "../components/EventItem";

const DUMMY_EVENTS = [
	{
		id: 1,
		imageSrc: "https://picsum.photos/200",
		imageAlt: "Event Image 1",
		date: "SUN, SEP 17 • 12:00 PM EDT",
		title: "Let's Go: Portugal 2023",
		location: "Montclair, NJ",
		organizer: "Piero Coronado",
		attendees: 3,
	},
	{
		id: 2,
		imageSrc: "https://picsum.photos/201",
		imageAlt: "Event Image 2",
		date: "SAT, AUG 25 • 3:30 PM EDT",
		title: "Hiking Adventure",
		location: "Blue Ridge Mountains, VA",
		organizer: "Alexandra Davis",
		attendees: 10,
	},
	{
		id: 3,
		imageSrc: "https://picsum.photos/202",
		imageAlt: "Event Image 3",
		date: "FRI, OCT 7 • 6:00 PM EDT",
		title: "Cooking Workshop: Italian Cuisine",
		location: "Culinary Studio, Miami, FL",
		organizer: "Giovanni Russo",
		attendees: 15,
	},
	{
		id: 4,
		imageSrc: "https://picsum.photos/203",
		imageAlt: "Event Image 4",
		date: "WED, NOV 12 • 7:30 PM EST",
		title: "Concert Under the Stars",
		location: "City Park Amphitheater, Austin, TX",
		organizer: "Melissa Roberts",
		attendees: 100,
	},
	{
		id: 5,
		imageSrc: "https://picsum.photos/204",
		imageAlt: "Event Image 5",
		date: "THU, DEC 19 • 5:00 PM PST",
		title: "Winter Wonderland: Ice Skating Fun",
		location: "Frosty Ice Rink, Seattle, WA",
		organizer: "Daniel Smith",
		attendees: 25,
	},
	{
		id: 6,
		imageSrc: "https://picsum.photos/205",
		imageAlt: "Event Image 6",
		date: "MON, JAN 9 • 11:00 AM CST",
		title: "Tech Talk: Future of AI",
		location: "Innovation Hub, Chicago, IL",
		organizer: "Sophia Patel",
		attendees: 50,
	},
	{
		id: 7,
		imageSrc: "https://picsum.photos/206",
		imageAlt: "Event Image 7",
		date: "SAT, FEB 22 • 2:00 PM EST",
		title: "Photography Workshop",
		location: "Creative Studio, New York, NY",
		organizer: "Ryan Thompson",
		attendees: 20,
	},
	{
		id: 8,
		imageSrc: "https://picsum.photos/207",
		imageAlt: "Event Image 8",
		date: "TUE, MAR 5 • 9:30 AM EST",
		title: "Business Networking Breakfast",
		location: "Grand Hotel, Los Angeles, CA",
		organizer: "Jessica Lee",
		attendees: 40,
	},
	{
		id: 9,
		imageSrc: "https://picsum.photos/208",
		imageAlt: "Event Image 9",
		date: "SUN, APR 16 • 1:00 PM EDT",
		title: "Gardening Workshop",
		location: "Botanical Garden, Atlanta, GA",
		organizer: "Michael Johnson",
		attendees: 12,
	},
	{
		id: 10,
		imageSrc: "https://picsum.photos/209",
		imageAlt: "Event Image 10",
		date: "FRI, MAY 27 • 6:30 PM EDT",
		title: "Outdoor Movie Night",
		location: "Community Park, San Diego, CA",
		organizer: "Sarah Williams",
		attendees: 30,
	},
];

const Events = () => {
	return (
		<main className={classes.main}>
			<h1>
				<span>234</span> events waiting for you!
			</h1>
			<FiltersForm />
			<section className={classes.events}>
				{DUMMY_EVENTS.map((event) => (
					<EventItem event={event} key={event.id} />
				))}
			</section>
		</main>
	);
};

export default Events;
