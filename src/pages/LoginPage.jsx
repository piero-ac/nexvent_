import { useState } from "react";
import { Form } from "react-router-dom";
import classes from "../styling/LoginPage.module.css";

const Login = () => {
	const [formType, setFormType] = useState("login");

	return (
		<main className={classes.main}>
			<section className={classes.tabs}>
				<button
					className={classes.login_btn}
					onClick={() => setFormType("login")}
					disabled={formType === "login"}
				>
					Login
				</button>
				<button
					className={classes.signup_btn}
					onClick={() => setFormType("signup")}
					disabled={formType === "signup"}
				>
					Signup
				</button>
			</section>
			<section className={classes.form_section}>
				<Form method="post" className={classes.form}>
					<input
						name="intent"
						type="hidden"
						value={formType === "login" ? "login" : "signup"}
					/>
					<input
						name="email"
						type="email"
						placeholder="Enter email here..."
						required
					/>
					<input
						name="password"
						type="password"
						placeholder="Enter password here..."
						required
					/>
					<button type="submit">
						{formType === "login" ? "Login" : "Signup"}
					</button>
				</Form>
			</section>
		</main>
	);
};

export async function action({ request }) {
	const formData = Object.fromEntries(await request.formData());

	if (formData.intent === "login") {
		console.log("Login Action");
		console.log(formData.email);
		console.log(formData.password);
	} else if (formData.intent === "signup") {
		console.log("Signup Action");
		console.log(formData.email);
		console.log(formData.password);
	}

	// actions should return a value or null
	return null;
}

export default Login;
