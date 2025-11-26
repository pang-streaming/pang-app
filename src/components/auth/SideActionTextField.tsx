import styled, { useTheme } from "styled-components/native"
import type { ThemeProps } from "@/theme/types";
import { TextInputProps, TouchableOpacity } from "react-native"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react-native"
import TextInput from "../ui/TextInput";

interface SideActionTextFieldProps extends TextInputProps {
  icon: React.ReactNode;
  actionIcon: React.ReactNode;
  actionOnPress: () => void;
}

export default function SideActionTextField({ icon, actionIcon, actionOnPress, ...props }: SideActionTextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <Container>
      {icon}
      <Divider />
      <TextInput
        {...props}
        placeholderTextColor={theme.colors.text.placeholder}
        style={{ flex: 1, height: "100%", color: theme.colors.text.normal }}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={false}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <SideActionButton onPress={actionOnPress}>
        {actionIcon}
      </SideActionButton>
    </Container>
  );
}

const Container = styled.View`
  
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
`;

const SideActionButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.primary.light};
  
  justify-content: center;
  align-items: center;
  
`;