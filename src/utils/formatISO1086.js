export function formatISO1086(timestamp, format) {
	if (format === "short") {
		return onlyMonthAndDate(timestamp);
	} else if (format === "full") {
		return fullDateWithTime(timestamp);
	} else {
		return formatTimestamp(timestamp);
	}
}

function formatTimestamp(timestamp) {
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

// Returns in format: MM YYYY
function onlyMonthAndDate(timestamp) {
	// Input ISO 8601 date string
	const isoDateString = timestamp;

	// Parse ISO date string into a Date object
	const dateObject = new Date(isoDateString);

	// Define an array of abbreviated month names
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	// Get the month and year components
	const month = monthNames[dateObject.getMonth()];
	const year = dateObject.getFullYear();

	// Format the date as "MMM YYYY"
	const formattedDate = `${month} ${year}`;

	return formattedDate; // Output: "Sep 2023"
}

// Returns in Format: MM (month), DD (day), YYYY (year) HH:MM AM/PM
function fullDateWithTime(timestamp) {
	const date = new Date(timestamp);

	const monthsAbbreviated = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const monthAbbreviated = monthsAbbreviated[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	let hours = date.getHours();
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12; // Convert to 12-hour format

	const minutes = date.getMinutes();

	const formattedDate = `${monthAbbreviated} ${day}, ${year} ${hours}:${minutes
		.toString()
		.padStart(2, "0")} ${ampm}`;

	return formattedDate;
}
