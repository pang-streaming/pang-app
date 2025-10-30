import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import styled, { useTheme } from "styled-components/native";
import type { ThemeProps } from "@/theme/types";
import { router } from "expo-router";
import Text from "./Text";
import Dismiss from "../icons/Dismiss";
import { useThemeStore } from "@/stores/useThemeStore";

interface BodyProps {
  children: React.ReactNode;
  dismiss?: boolean;
}

export default function Body({ children, dismiss = false }: BodyProps) {
  const insets = useSafeAreaInsets(); 
  const mode = useThemeStore((s) => s.mode);
  const colorScheme = useColorScheme();
  const effectiveMode = mode === 'system' ? (colorScheme ?? 'light') : mode;
  const theme = useTheme();

  return (
    <>
      <StatusBar style={effectiveMode === 'dark' ? 'light' : 'dark'} translucent backgroundColor="transparent" />
      <Container>
        <Wrapper>
          {dismiss && (
            <DismissButton
              onPress={() => router.back()}
              style={{ top: insets.top + 30 }}
            >
              <Dismiss color={theme.colors.text.normal}/>
            </DismissButton>
          )}
          {children}
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
`;

const Wrapper = styled(SafeAreaView)`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
`;

const DismissButton = styled(TouchableOpacity)`
  position: absolute;
  left: 0px;
  z-index: 1000;
`;
