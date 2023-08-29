export default function formatTimestamp(timestamp) {
	const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	const months = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];

	const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

	const dayOfWeek = daysOfWeek[date.getUTCDay()];
	const month = months[date.getUTCMonth()];
	const day = date.getUTCDate();

	// Get local time components
	const hours = date.getHours();
	const minutes = date.getMinutes();

	// Determine whether it's AM or PM
	const amOrPm = hours >= 12 ? "PM" : "AM";

	// Convert to 12-hour format
	const hours12 = hours % 12 || 12;

	// Format minutes with leading zero
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	return {
		date: `${dayOfWeek}, ${month} ${day}`,
		time: `${hours12}:${formattedMinutes} ${amOrPm}`,
	};
}
