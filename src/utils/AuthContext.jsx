/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

	useEffect(() => {
		checkUserStatus();
	}, []);

	const loginUser = async (userInfo) => {
		setLoading(true);
		console.log("userinfo", userInfo);

		try {
			const response = await account.createEmailSession(
				userInfo.email,
				userInfo.password
			);
			const accountDetails = await account.get();
			setUser(accountDetails);
		} catch (err) {
			console.error(err);
		}
		setLoading(false);
	};

	const logoutUser = async () => {
		await account.deleteSession("current");
		setUser(null);
	};

	const registerUser = async (userInfo) => {
		setLoading(true);

		try {
			const response = await account.create(
				ID.unique(),
				userInfo.email,
				userInfo.password1,
				userInfo.name
			);
			await account.createEmailSession(userInfo.email, userInfo.password1);
			const accountDetails = await account.get();
			setUser(accountDetails);
			navigate("/");
		} catch (error) {
			console.error(error);
		}

		setLoading(false);
	};

	const checkUserStatus = async () => {
		try {
			const accountDetails = await account.get();
			setUser(accountDetails);
		} catch (err) {
			console.error(err);
		}
		setLoading(false);
	};

	const contextData = {
		user,
		loginUser,
		logoutUser,
		registerUser,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{loading ? <p>Loading...</p> : children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};
export default AuthContext;
