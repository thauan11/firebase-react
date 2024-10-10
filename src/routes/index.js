import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Posts } from "../pages/posts";
import { Private } from "./Private";

export function RoutesApp() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/posts"
				element={
					<Private>
						<Posts />
					</Private>
				}
			/>
		</Routes>
	);
}
