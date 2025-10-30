import { TextInputProps, TextInput as RNTextInput } from "react-native";
import styled from "styled-components/native";
import type { ThemeProps } from "@/theme/types";

export default function TextInput({ ...props }: TextInputProps) {
    return (
        <TextInputBase
            {...props} 
        />
    )
}

const TextInputBase = styled(RNTextInput)`
    font-family: "WantedSans-Regular";
    color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
`