import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/HomePage";
import Events from "./pages/EventsPage";

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
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
