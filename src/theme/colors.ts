export interface Colors {
	primary: { normal: string; dark: string; light: string };
	secondary: { normal: string; dark: string; light: string };
	hover: { normal: string; dark: string; light: string };
	text: { normal: string; placeholder: string; subtitle: string };
	button: { normal: string; disabled: string; active: string };
	status: { positive: string; neutral: string; negative: string };
	common: { white: string; black: string; grey: string };
	background: { normal: string; light: string; dark: string };
	content: { normal: string; dark: string; light: string };
	stroke: { light: string; normal: string; dark: string };
	border: { light: string; normal: string; dark: string };
}

export const darkColors: Colors = {
	button: { active: "#FFFFFF", disabled: "#404040", normal: "#A3A3A3" },
	common: { black: "#000000", white: "#FFFFFF", grey: "#777777" },
	hover: { normal: "#CC0044", light: "#353535", dark: "#990033" },
	primary: { light: "#FFCCDD", normal: "#FF0055", dark: "#990033" },
	secondary: { light: "#9A57FF", normal: "#6600FF", dark: "#290066" },
	status: { negative: "#FF1600", neutral: "#FFD600", positive: "#64CD32" },
	text: { subtitle: "#A3A3A3", normal: "#FFFFFF", placeholder: "#D1D5DB" },
	background: { light: "#1F1F1F", normal: "#171717", dark: "#000000" },
	content: { light: "#A3A3A3", normal: "#262626", dark: "#27272A" },
	stroke: { light: "#D4D4D4", normal: "#A3A3A3", dark: "#0A0A0A" },
	border: { light: "#374151", normal: "#777777", dark: "#E0E0E0" }
};

export const lightColors: Colors = {
	button: { active: "#000000", disabled: "#D4D4D4", normal: "#555555" },
	common: { black: "#000000", white: "#FFFFFF", grey: "#777777" },
	hover: { normal: "#FF6699", light: "#F5F5F5", dark: "#990033" },
	primary: { light: "#FFCCDD", normal: "#FF0055", dark: "#990033" },
	secondary: { light: "#9A57FF", normal: "#6600FF", dark: "#290066" },
	status: { negative: "#DF0000", neutral: "#E6C200", positive: "#39A01D" },
	text: { subtitle: "#6E6E6E", normal: "#171717", placeholder: "#9CA3AF" },
	background: { light: "#FFFFFF", normal: "#FCFCFC", dark: "#E5E5E5" },
	content: { light: "#F9F9F9", normal: "#F2F2F2", dark: "#DEDEDE" },
	stroke: { light: "#444444", normal: "#777777", dark: "#E0E0E0" },
	border: { light: "#F1F5F9", normal: "#777777", dark: "#E0E0E0" }
};


