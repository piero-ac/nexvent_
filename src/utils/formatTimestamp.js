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

	return `${dayOfWeek}, ${month} ${day}`;
}
