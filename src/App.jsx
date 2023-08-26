import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/HomePage";
import Events, { loader as eventsLoader } from "./pages/EventsPage";
import Login, { action as loginAction } from "./pages/LoginPage";

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
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
