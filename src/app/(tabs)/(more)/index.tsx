import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import type { ThemeProps } from "@/theme/types";
import { ScrollView } from "react-native";
import Header from "@/components/ui/Header";
import { UserInfoSection } from "@/widgets/more/user-info-section";
import { ChargeBox } from "@/widgets/charge/charge-box";
import { MenuSection } from "@/widgets/more/menu-section";

export default function ProfileScreen() {
  return (
    <Container>
        <Content>
          <UserInfoSection />
          <ChargeBox type='charge'/>
          <MenuSection />
        </Content>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) =>
    theme.colors.background.normal};
`;

const Content = styled.View`
  flex: 1;
  
  padding: 0 20px;
  gap: 30px;
  justify-content: center;
  align-items: center;
`;

