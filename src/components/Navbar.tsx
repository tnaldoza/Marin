import { Link } from "react-router-dom";
import type { ReactElement } from "react";
import { useTheme } from "../contexts/ThemeContext.js";

export function Navbar(): ReactElement {
	const { theme, toggleTheme } = useTheme();
	return (
		<nav className="navbar">
			<div className="navbar-brand">
				<Link to="/">Marin</Link>
			</div>
			<ul className="navbar-links">
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/todos">Todo App</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
			<button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
				{theme === "dark" ? "☀️" : "🌙"}
			</button>
		</nav>
	);
}
