import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./routes/index";

export function App() {
	return (
		<BrowserRouter>
			<div className="bg-zinc-950 text-zinc-300 w-full min-h-screen flex justify-center pt-[10%]">
				<RoutesApp />
			</div>
		</BrowserRouter>
	);
}
