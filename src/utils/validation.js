export const validateNewEventFormData = (formData) => {
	if (
		typeof formData.eventTitle !== "string" ||
		typeof formData.eventDescription !== "string" ||
		typeof formData.eventType !== "string" ||
		typeof formData.eventDateTime !== "string" ||
		Object.values(formData.eventLocation).some(
			(str) => typeof str !== "string"
		) ||
		typeof formData.eventAdditionalInfo !== "string" ||
		typeof formData.eventImage !== "object" ||
		typeof formData.eventCategory !== "object"
	) {
		return {
			fieldErrors: null,
			fields: null,
			formError: "Form not submitted correctly.",
			isValid: false,
		};
	}

	const allowedEventTypes = ["online", "inperson"];
	const allowedEventCategories = [
		"hobbies_passions",
		"technology",
		"career_business",
	];

	const fields = { ...formData };
	const fieldErrors = {
		eventTitle: validateInputTextLength(formData.eventTitle, 10, 50, "Title"),
		eventDescription: validateInputTextLength(
			formData.eventDescription,
			30,
			250,
			"Description"
		),
		eventType: !allowedEventTypes.includes(formData.eventType)
			? "Invalid Event Type"
			: null,
		eventCategory: validateEventCategories(
			formData.eventCategory,
			allowedEventCategories
		),
		eventDateTime: validateDateTimeInput(formData.eventDateTime),
		eventLocation: validateEventLocation(
			formData.eventType,
			formData.eventLocation
		),
		eventAdditionalInfo: validateInputTextLength(
			formData.eventAdditionalInfo,
			0,
			250,
			"Additional Description"
		),
		eventImage:
			formData.eventImage === "undefined" ? "No Image Selected" : null,
	};

	if (Object.values(fieldErrors).some(Boolean)) {
		return {
			fields,
			fieldErrors,
			formError: null,
			isValid: false,
		};
	}

	return {
		fields,
		fieldErrors,
		formError: null,
		isValid: true,
	};
};

function validateInputTextLength(
	input,
	minLength,
	maxLength,
	type = null,
	customMsg = null
) {
	if (input.length > maxLength) {
		return customMsg || `${type} must be less than ${maxLength} characters`;
	} else if (input.length < minLength) {
		return customMsg || `${type} must be greater than ${minLength} characters`;
	}
	return null;
}

function validateEventCategories(input, allowedCategories) {
	if (input.length === 0) {
		return null;
	}

	const invalidCategories = input.filter(
		(category) => !allowedCategories.includes(category)
	);
	if (invalidCategories.length > 0) {
		return "Invalid Category Selected.";
	}
	return null;
}

function validateDateTimeInput(inputValue) {
	const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
	if (!dateTimeRegex.test(inputValue)) return "Invalid Date/Time.";
	return null;
}

function validateEventLocation(eventType, eventLocation) {
	const requiredFields = ["address1", "city", "state", "zipcode"];
	const validationResults = {};

	if (eventType === "online") {
		return null;
	}

	requiredFields.forEach((fieldName) => {
		const fieldValue = eventLocation[fieldName].trim();
		if (fieldValue === "") {
			// Field is required but empty
			let msg = "";
			switch (fieldName) {
				case "address1":
					msg = "Address Line 1 Cannot Be Empty.";
					break;
				case "city":
					msg = "City Cannot Be Empty.";
					break;
				case "state":
					msg = "State Cannot Be Empty.";
					break;
				case "zipcode":
					msg = "Zipcode Cannot Be Empty.";
					break;
				default:
					msg = `${fieldName} Cannot Be Empty.`;
			}

			validationResults[fieldName] = msg;
		} else {
			// Additional validation can be added here if needed.
			// For example, you can validate the format of the zipcode.
			if (fieldName === "zipcode") {
				validationResults[fieldName] = validateZipcode(fieldValue);
			} else if (fieldName === "state") {
				validationResults[fieldName] = validateState(fieldValue);
			} else {
				validationResults[fieldName] = null;
			}
		}
	});

	// Check if all values in validationResults are null
	const allNull = Object.values(validationResults).every(
		(value) => value === null
	);

	return allNull ? null : validationResults;
}

function validateZipcode(zip) {
	const zipCodeRegex = /^\d{5}(?:-\d{4})?$/;
	if (!zipCodeRegex.test(zip)) return "Invalid Zipcode Format.";
	return null;
}

function validateState(stateValue) {
	const validStateAbbreviations = [
		"AL",
		"AK",
		"AZ",
		"AR",
		"CA",
		"CO",
		"CT",
		"DE",
		"FL",
		"GA",
		"HI",
		"ID",
		"IL",
		"IN",
		"IA",
		"KS",
		"KY",
		"LA",
		"ME",
		"MD",
		"MA",
		"MI",
		"MN",
		"MS",
		"MO",
		"MT",
		"NE",
		"NV",
		"NH",
		"NJ",
		"NM",
		"NY",
		"NC",
		"ND",
		"OH",
		"OK",
		"OR",
		"PA",
		"RI",
		"SC",
		"SD",
		"TN",
		"TX",
		"UT",
		"VT",
		"VA",
		"WA",
		"WV",
		"WI",
		"WY",
	];

	if (!validStateAbbreviations.includes(stateValue)) return "Invalid State";
	return null;
}
