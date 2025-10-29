import React from "react";
import { Text as RNText, TextProps, TextStyle } from "react-native";

export type FontWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "thin"
  | "extralight"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export interface TextPropsExtended extends TextProps {
  weight?: FontWeight;
  color?: string;
  size?: number;
  align?: "left" | "center" | "right";
}

const weightMap: Record<FontWeight, string> = {
  "100": "WantedSans-Regular",
  "200": "WantedSans-Regular",
  "300": "WantedSans-Regular",
  "400": "WantedSans-Regular",
  "500": "WantedSans-Medium",
  "600": "WantedSans-SemiBold",
  "700": "WantedSans-Bold",
  "800": "WantedSans-ExtraBold",
  "900": "WantedSans-Black",
  thin: "WantedSans-Regular",
  extralight: "WantedSans-Regular",
  light: "WantedSans-Regular",
  regular: "WantedSans-Regular",
  medium: "WantedSans-Medium",
  semibold: "WantedSans-SemiBold",
  bold: "WantedSans-Bold",
  extrabold: "WantedSans-ExtraBold",
  black: "WantedSans-Black",
};

export default function Text({
  children,
  weight = "400",
  color,
  size = 16,
  align = "left",
  style,
  ...rest
}: TextPropsExtended) {
  const fontFamily = weightMap[weight] || "WantedSans-Regular";
  const textColor = color || "#000";
  
  const textStyle: TextStyle = {
    fontFamily,
    color: textColor,
    fontSize: size,
    textAlign: align,
  };
  
  return (
    <RNText
      style={[textStyle, style]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
