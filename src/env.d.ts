/// <reference path="../.astro/db-types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="../.astro/@matthiesenxyz/astrolace.d.ts" />

interface Window {
	theme: {
	  setTheme: (theme: "auto" | "dark" | "light") => void;
	  getTheme: () => "auto" | "dark" | "light";
	  getSystemTheme: () => "light" | "dark";
	  getDefaultTheme: () => "auto" | "dark" | "light";
	};
}