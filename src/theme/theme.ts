import type { DefaultTheme } from "styled-components";
import { Colors, darkColors, lightColors } from "./colors";
import { Borders, borders } from "./borders";
import { Shadows, shadows } from "./shadow";
import { FontSizes, fontSizes } from "./fonts";
import { Breakpoints, breakpoints } from "./breakpoints";



declare module "styled-components" {
	export interface DefaultTheme {
		colors: Colors;
		breakpoint: Breakpoints;
		font: FontSizes;
		shadows: Shadows;
		borders: Borders;
	}
}

export const lightTheme: DefaultTheme = {
	colors: lightColors,
	borders: borders,
	font: fontSizes,
	shadows: shadows,
	breakpoint: breakpoints,
};

export const darkTheme: DefaultTheme = {
	colors: darkColors,
	borders: borders,
	font: fontSizes,
	shadows: shadows,
	breakpoint: breakpoints,
};


