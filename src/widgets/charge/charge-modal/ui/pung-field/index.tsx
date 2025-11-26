import React from "react";
import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import type { ThemeProps } from "@/theme/types";

interface PungFieldProps {
  pungAmount: number;
  type: "charge" | "sponsor";
}

export const PungField = ({ pungAmount, type }: PungFieldProps) => {
  return (
    <Wrapper>
      <Label>{type === "charge" ? "충전할 펑" : "후원할 펑"}</Label>
      <Container type={type}>
        <Emoji>💣</Emoji>
        <Field
          value={pungAmount.toLocaleString()}
          editable={false}
        />
      </Container>
    </Wrapper>
  );
};

const Label = styled(Text)<ThemeProps>`
  font-size: ${({ theme }: ThemeProps) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
`;

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface IContainerProps {
  type: "charge" | "sponsor";
}

const Container = styled.View<IContainerProps & ThemeProps>`
  width: 187px;
  height: 37px;
  background-color: ${({ theme, type }: ThemeProps & IContainerProps) =>
    type === "sponsor"
      ? theme.colors.content.normal
      : theme.colors.background.normal};
  border-radius: ${({ theme }: ThemeProps) => theme.borders.medium};
  padding-left: 11px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 11px;
`;

const Emoji = styled(Text)`
  font-size: 20px;
`;

const Field = styled(TextInput)<ThemeProps>`
  flex: 1;
  font-size: ${({ theme }: ThemeProps) => theme.font.xLarge};
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  background-color: transparent;
`;
