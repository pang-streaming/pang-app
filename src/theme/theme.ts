import type { DefaultTheme } from "styled-components";
import { Colors, darkColors, lightColors } from "./colors";

// Optional placeholders to keep typings simple for now
export interface Breakpoints { }
export interface FontSizes { }
export interface Shadows { }
export interface Borders { }

declare module "styled-components" {
	export interface DefaultTheme {
		colors: Colors;
		breakpoint?: Breakpoints;
		font?: FontSizes;
		shadows?: Shadows;
		borders?: Borders;
	}
}

export const lightTheme: DefaultTheme = {
	colors: lightColors
};

export const darkTheme: DefaultTheme = {
	colors: darkColors
};


