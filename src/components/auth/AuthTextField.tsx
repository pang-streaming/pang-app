import styled, { useTheme } from "styled-components/native"
import type { ThemeProps } from "@/theme/types";
import { TextInputProps, TouchableOpacity } from "react-native"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native"
import TextInput from "../ui/TextInput";

interface AuthTextFieldProps extends TextInputProps {
  icon: React.ReactNode;
  isSecret?: boolean;
}

export default function AuthTextField({ icon, isSecret = false, ...props }: AuthTextFieldProps) {
  const theme = useTheme();
  const [isSecretText, setIsSecretText] = useState(isSecret);
  const [focused, setFocused] = useState(false);

  return (
    <Container>
      {icon}
      <Divider />
      <TextInput
        {...props}
        placeholderTextColor={theme.colors.text.placeholder}
        style={{ flex: 1, height: "100%", color: theme.colors.text.normal }}
        secureTextEntry={isSecretText}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {isSecret && focused && (
        <TouchableOpacity onPress={() => setIsSecretText(!isSecretText)}>
          {isSecretText
            ? <Eye size={16} color={theme.colors.text.subtitle} />
            : <EyeOff size={16} color={theme.colors.text.subtitle} />}
        </TouchableOpacity>
      )}
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;

  width: 100%;
  height: 50px;

  border-radius: 8px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
  
  padding: 0 18px;
`;

const Divider = styled.View`
  width: 0.5px;
  height: 30px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.stroke.normal};
`
