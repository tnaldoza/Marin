import { createContext, useContext, useState, useEffect, type ReactElement, type ReactNode } from "react";

interface ThemeContextType {
	theme: "light" | "dark";
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
	const context = useContext(ThemeContext);

	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}

	return context;
}

interface ThemeProviderProps {
	children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
	const [theme, setTheme] = useState<"light" | "dark">(() => {
		const stored = localStorage.getItem("marin-theme");
		if (stored === "light" || stored === "dark") {
			return stored;
		}
		return "dark";
	});

	useEffect(() => {
		localStorage.setItem("marin-theme", theme);
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	const toggleTheme = (): void => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
