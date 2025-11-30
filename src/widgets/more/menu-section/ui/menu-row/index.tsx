import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import Icon from "@/assets/chevron-right.svg";
import { ThemeProps } from "@/theme/types";

interface Props {
  label: string;
  onPress: () => void;
}

export const MenuRow = ({ onPress, label }: Props) => {
  return (
    <Container disabled={label ==='버전 정보'} onPress={onPress}>
      <Label>{label}</Label>
      {label === "버전 정보" ? <VersionInfo>1.0</VersionInfo> : <Icon />}
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const Label = styled(Text)<ThemeProps>`
  font-size: ${({ theme }) => theme.font.large};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;
const VersionInfo = styled(Text)`
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.text.normal};
`;
