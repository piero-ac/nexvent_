import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import EventPage from "./pages/EventPage";
import PrivateRoutes from "./pages/PrivateRoutesLayout";
import NewEvent from "./pages/NewEventPage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";

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
				path: "events",
				children: [
					{
						index: true,
						element: <EventsPage />,
						loader: eventsLoader,
					},
					{ path: ":eventId", element: <EventPage /> },
				],
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
