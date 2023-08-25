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
				<Form
					method="POST"
					action={formType === "login" ? "/login" : "/signup"}
				>
					<input type="email" placeholder="Enter email here..." required />
					<input
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

export default Login;
