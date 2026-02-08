import type { ReactElement } from "react";

export function About(): ReactElement {
	return (
		<div className="page about-page">
			<header className="page-header">
				<h1>About Marin</h1>
			</header>
			<section className="about-content">
				<h2>Project Marin</h2>
				<p>This project was created to learn and demonstrate React fundamentals, Typescript, and modern web development practices.</p>
				<h2>Tech Stack</h2>
				<ul>
					<li>React 19.2.4 - Component-based UI library</li>
					<li>TypeScript 5.9.3 - Type-safe JavaScript</li>
					<li>Vite 7.3.1 - Fast build tool</li>
					<li>React Router - Client-side routing</li>
					<li>Temporal API - Modern date/time handling</li>
				</ul>
				<h2>Features</h2>
				<ul>
					<li>Component architecture with reusable UI pieces</li>
					<li>Client-side routing with React Router</li>
					<li>Glass morphism design with dark theme</li>
					<li>TypeScript strict mode</li>
					<li>ESLint + Prettier + Git hooks</li>
				</ul>
			</section>
		</div>
	);
}
