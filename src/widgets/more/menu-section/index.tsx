import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { MenuRow } from "./ui/menu-row";
import { ThemeProps } from "@/theme/types";
import { logoutUser } from "@/features/auth/login/api";
import { useRouter } from "expo-router";

export const MenuSection = () => {
  const router = useRouter();
  const menus = [

    { label: "개인정보 처리방침", onPress: () => {} },
    { label: "버전 정보", onPress: () => {} },
    { label: "로그아웃", onPress: () => {
      logoutUser(router)
    } },
    { label: "회원탈퇴", onPress: () => {} },
  ];
  return (
    <Container>
      {menus.map((m, i) => (
        <View key={i}>
          <MenuRow key={i} label={m.label} onPress={m.onPress} />
          {menus.length - 1 !== i && <Divider />}
        </View>
      ))}
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  flex-direction: column;
`;

const Divider = styled(View)<ThemeProps>`
  width: 100%;
  height: 1px;
  margin: 12px 0;
  background-color: #525252;
`;
