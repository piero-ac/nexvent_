import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/HomePage";
import Events, { loader as eventsLoader } from "./pages/EventsPage";
import Login, { action as loginAction } from "./pages/LoginPage";
import Event, { loader as eventLoader } from "./pages/EventPage";

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
				path: "events",
				element: <Events />,
				loader: eventsLoader,
			},
			{
				path: "login",
				element: <Login />,
				action: loginAction,
			},
			{
				path: "event/:eventId",
				element: <Event />,
				loader: eventLoader,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
