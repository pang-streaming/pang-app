import Svg, { Path } from "react-native-svg";
import { useTheme } from "styled-components/native";

interface Props {
  color?: string;
}

export default function Explore({ color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.text.subtitle;

  return (
    <Svg width="23" height="23" viewBox="0 0 23 23" fill="none">
      <Path
        d="M9.16406 2.15625H3.05469C2.55849 2.15625 2.15625 2.55849 2.15625 3.05469V9.16406C2.15625 9.66026 2.55849 10.0625 3.05469 10.0625H9.16406C9.66026 10.0625 10.0625 9.66026 10.0625 9.16406V3.05469C10.0625 2.55849 9.66026 2.15625 9.16406 2.15625Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M19.9453 2.15625H13.8359C13.3397 2.15625 12.9375 2.55849 12.9375 3.05469V9.16406C12.9375 9.66026 13.3397 10.0625 13.8359 10.0625H19.9453C20.4415 10.0625 20.8438 9.66026 20.8438 9.16406V3.05469C20.8438 2.55849 20.4415 2.15625 19.9453 2.15625Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M9.16406 12.9375H3.05469C2.55849 12.9375 2.15625 13.3397 2.15625 13.8359V19.9453C2.15625 20.4415 2.55849 20.8438 3.05469 20.8438H9.16406C9.66026 20.8438 10.0625 20.4415 10.0625 19.9453V13.8359C10.0625 13.3397 9.66026 12.9375 9.16406 12.9375Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M19.9453 12.9375H13.8359C13.3397 12.9375 12.9375 13.3397 12.9375 13.8359V19.9453C12.9375 20.4415 13.3397 20.8438 13.8359 20.8438H19.9453C20.4415 20.8438 20.8438 20.4415 20.8438 19.9453V13.8359C20.8438 13.3397 20.4415 12.9375 19.9453 12.9375Z"
        stroke={stroke}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
