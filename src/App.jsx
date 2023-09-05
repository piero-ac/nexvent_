import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import EventPage from "./pages/EventPage";
import PrivateRoutes from "./pages/PrivateRoutesLayout";
import NewEvent from "./pages/NewEventPage";

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
			{
				path: "new",
				element: <PrivateRoutes />,
				children: [{ index: true, element: <NewEvent /> }],
			},
			{
				path: "event/:eventId",
				// loader: () => {
				// 	return redirect("/new");
				// },
				element: <EventPage />,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
