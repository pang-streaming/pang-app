import { ChargeButton } from "@/widgets/charge/charge-box/ui/charge-button";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "styled-components/native";
import type { ThemeProps } from "@/theme/types";

interface AddCardSectionProps {
  toPaymentAdd: () => void;
}

interface GradientCircleProps {
  size?: number;
  children: React.ReactNode;
}

const GradientCircle = ({ size = 46, children }: GradientCircleProps) => {
  const theme = useTheme();
  return (
    <GradientCircleContainer size={size}>
      <LinearGradient
        colors={[theme.colors.primary.normal, theme.colors.secondary.normal]}
        style={{ width: '100%', height: '100%', borderRadius: size / 2 }}
      >
        {children}
      </LinearGradient>
    </GradientCircleContainer>
  );
};

export const AddCardSection = ({ toPaymentAdd }: AddCardSectionProps) => {
  return (
    <Container>
      <GradientCircle size={46}>
        <InnerCircle>
          <Emoji>💣</Emoji>
        </InnerCircle>
      </GradientCircle>
      <Label>카드가 목록에 없나요?</Label>
      <ChargeButton onPress={toPaymentAdd}>
        {/*  */}
      </ChargeButton>
    </Container>
  );
};

const Container = styled.View`
  padding: 12px;
  border-radius: ${({ theme }: ThemeProps) => theme.borders.large};
  border: 1px solid ${({ theme }: ThemeProps) => theme.colors.content.normal};
  flex-direction: row;
  align-items: center;
`;

const Label = styled(Text)<ThemeProps>`
  font-size: ${({ theme }: ThemeProps) => theme.font.large};
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  margin-right: auto;
`;

const GradientCircleContainer = styled.View<{ size: number }>`
  width: ${({ size }: { size: number }) => `${size}px`};
  height: ${({ size }: { size: number }) => `${size}px`};
  border-radius: ${({ size }: { size: number }) => `${size / 2}px`};
  margin-right: 10px;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const InnerCircle = styled.View<ThemeProps>`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Emoji = styled(Text)`
  font-size: 24px;
`;