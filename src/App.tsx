import type { ReactElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.js";
import { Home } from "./pages/Home.js";
import { TodoApp } from "./pages/TodoApp.js";
import { About } from "./pages/About.js";
import "./App.css";

function App(): ReactElement {
	return (
		<BrowserRouter>
			<div className="app">
				{/* Navbar shows on EVERY page */}
				<Navbar />

				{/* Routes define which page to show based on URL */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/todos" element={<TodoApp />} />
					<Route path="/about" element={<About />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
