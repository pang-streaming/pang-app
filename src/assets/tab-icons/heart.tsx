import Svg, { Path } from "react-native-svg";
import { useTheme } from "styled-components/native";

interface Props {
  color?: string;
}

export default function Heart({ color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.text.subtitle;

  return (
    <Svg width={22} height={20} viewBox="0 0 22 20" fill="none">
      <Path
        d="M16.0477 1C12.6666 1 11 4.27272 11 4.27272C11 4.27272 9.33343 1 5.95235 1C3.20458 1 1.02866 3.25715 1.00053 5.95049C0.943244 11.5412 5.51748 15.5171 10.5313 18.8583C10.6695 18.9506 10.8328 19 11 19C11.1672 19 11.3305 18.9506 11.4687 18.8583C16.482 15.5171 21.0562 11.5412 20.9995 5.95049C20.9714 3.25715 18.7954 1 16.0477 1Z"
        stroke={stroke}
        strokeWidth={2}       
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </Svg>
  );
}
