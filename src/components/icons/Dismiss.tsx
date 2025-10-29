import Svg, { Path } from "react-native-svg";

interface DismissProps {
    color?: string;
}

export default function Dismiss({ color = "white" }: DismissProps) {
    return (
        <Svg width="12" height="20" viewBox="0 0 12 20" fill="none">
            <Path d="M0 10.001C0.00409985 10.3851 0.147699 10.7161 0.452 11.009L9.25705 19.629C9.5135 19.876 9.81915 20 10.1884 20C10.9155 20 11.5 19.4293 11.5 18.6954C11.5 18.3378 11.3544 18.0068 11.1023 17.7497L3.153 10.003L11.1023 2.2523C11.3524 1.9973 11.5 1.6736 11.5 1.3046C11.5 0.572701 10.9155 0 10.1884 0C9.82325 0 9.5135 0.124001 9.25705 0.380301L0.452 8.9931C0.145599 9.2952 0 9.619 0 10.001Z" fill={color}/>
        </Svg>
    )
}