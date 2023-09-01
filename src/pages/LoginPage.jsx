import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import classes from "../styling/LoginPage.module.css";

const Login = () => {
	const navigate = useNavigate();
	const [formType, setFormType] = useState("login");
	const { user, loginUser, registerUser } = useAuth();
	const form = useRef(null);

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	const handleLogin = (e) => {
		e.preventDefault();

		const email = form.current.email.value;
		const password = form.current.password.value;

		const userInfo = { email, password };

		loginUser(userInfo);
	};

	const handleRegister = (e) => {
		e.preventDefault();
		const name = form.current.name.value;
		const email = form.current.email.value;
		const password1 = form.current.password.value;
		const password2 = form.current.passwordConfirm.value;

		if (password1 !== password2) {
			alert("Passwords did not match");
			return;
		}

		const userInfo = { name, email, password1, password2 };
		registerUser(userInfo);
	};

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
				<form
					ref={form}
					className={classes.form}
					onSubmit={formType === "login" ? handleLogin : handleRegister}
				>
					{formType === "signup" && (
						<input
							name="name"
							type="text"
							placeholder="Enter name here..."
							required
						/>
					)}
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
					{formType === "signup" && (
						<input
							name="passwordConfirm"
							type="password"
							placeholder="Confirm password"
							required
						/>
					)}
					<button type="submit">
						{formType === "login" ? "Login" : "Signup"}
					</button>
				</form>
			</section>
		</main>
	);
};

export default Login;
