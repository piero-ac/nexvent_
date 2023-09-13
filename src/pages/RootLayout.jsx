import MainNavigation from "../components/MainNavigation";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../utils/AuthContext";

export default function RootLayout() {
	return (
		<AuthProvider>
			<MainNavigation />
			<Outlet />
		</AuthProvider>
	);
}
