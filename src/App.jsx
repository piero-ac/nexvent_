import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import PrivateRoutes from "./pages/PrivateRoutesLayout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "profile",
				element: <PrivateRoutes />,
				children: [{ index: true, element: <Profile /> }],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
