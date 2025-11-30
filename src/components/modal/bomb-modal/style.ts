import { ThemeProps } from "@/theme/types";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";


export const ModalHandle = styled.View`
  width: 40px;
  height: 4px;
  background-color: #777777;
  border-radius: 2px;
  align-self: center;
  margin-top: 12px;
  margin-bottom: 8px;
`;

export const ContentArea = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 10px;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};

`;

export const TabBar = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.border.light || '#222324'};
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
  position: relative;
`;

export const TabsContainer = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  gap: 24px;
  position: relative;
`;

export const TabButton = styled.Pressable`
  padding: 8px 4px;
  position: relative;
`;

export const TabText = styled.Text<{ isActive?: boolean }>`
  color: ${({ theme, isActive }: ThemeProps & { isActive?: boolean }) => 
    isActive ? theme.colors.primary.normal : '#FFFFFF'};
  font-size: 16px;
  font-weight: ${({ isActive }: { isActive?: boolean }) => isActive ? '700' : '400'};
`;

export const AnimatedIndicator = styled(Animated.View)`
  position: absolute;

  bottom: -1px;
  height: 3px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.primary.normal};
  border-radius: 1.5px;
`;

export const TabContent = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

export const ChatContent = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

export const EmptyContent = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

export const ModalOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

export const ModalContainer = styled(Animated.View)<{ 
  bottomInset: number; 
  videoPlayerWidth: number;
  videoPlayerX: number;
  videoPlayerTop: number;
}>`
  position: absolute;
  top: ${({ videoPlayerTop }: { videoPlayerTop: number }) => videoPlayerTop}px;
  left: ${({ videoPlayerX }: { videoPlayerX: number }) => videoPlayerX}px;
  width: ${({ videoPlayerWidth }: { videoPlayerWidth: number }) => videoPlayerWidth}px;
  bottom: 0;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1000;
  flex-direction: column;
`;
