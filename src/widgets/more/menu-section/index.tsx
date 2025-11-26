import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { MenuRow } from "./ui/menu-row";
import { ThemeProps } from "@/theme/types";

export const MenuSection = () => {
  const menus = [
    { label: "팔로우 목록 보기", onPress: () => {} },
    { label: "최근 시청한 영상 보기", onPress: () => {} },
    { label: "프로필 정보 수정하기", onPress: () => {} },
    { label: "성인인증 진행하기", onPress: () => {} },
    { label: "로그아웃", onPress: () => {} },
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
