import styled from "styled-components/native"
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

  const [focused, setFocused] = useState(false);

  return (
    <Container>
      {icon}
      <Divider />
      <TextInput
        {...props}
        placeholderTextColor="#A3A3A3"
        style={{ flex: 1, height: "100%", color: "white" }}
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 18px;

  width: 100%;
  height: 50px;

  border-radius: 8px;
  background-color: #262626;
  
  padding: 0 18px;
`;

const Divider = styled.View`
  width: 0.5px;
  height: 30px;
  background-color: #737373;
`;

const SideActionButton = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background-color: #A3A3A3;
  display: flex;
  justify-content: center;
  align-items: center;
  
`;