import { ThemeProps } from "@/theme/types";
import React from "react";
import styled from "styled-components/native";

interface LiveChipProps {
  viewerCount: number;
}

export const LiveChip = ({ viewerCount }: LiveChipProps) => {
  return (
    <ChipWrap>
      <RedDot />
      <ChipText>{viewerCount.toLocaleString()}명</ChipText>
    </ChipWrap>
  );
};

const RedDot = styled.View`
  width: 6;
  height: 6;
  border-radius: 50%;
  background-color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
`;

const ChipWrap = styled.View`
  width: 57px;
  height: 18px;
  border-radius: 4px;
  background-color: ${({ theme }: ThemeProps) =>
    theme.colors.background.normal};
  position: absolute;
  top: 3;
  left: 3;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const ChipText = styled.Text`
  font-size: 10px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
`;
