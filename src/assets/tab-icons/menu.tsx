import Svg, { Path } from "react-native-svg";
import { useTheme } from "styled-components/native";

interface Props { color?: string }

export default function Menu({ color }: Props) {
    const theme = useTheme();
    const stroke = color ?? theme.colors.text.subtitle;

    return (
        <Svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <Path
                d="M1 13H19M1 7H19M1 1H19"
                stroke={stroke}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}