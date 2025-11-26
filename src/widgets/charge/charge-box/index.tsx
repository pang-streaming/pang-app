import { View } from "react-native";
import styled from "styled-components";
import { ChargeButton } from "./ui/charge-button";
import { Text } from "react-native";
import AutoSetting from "@/assets/auto-setting.svg";
interface Props {
  type: "charge" | "auto-setting";
  onPress?: () => void;
}

export const ChargeBox = ({ type, onPress }: Props) => {
  return (
    <Container>
      {type === "charge" ? (
        <Circle>
          <Text>💣</Text>
        </Circle>
      ) : (
        <AutoWrapper>
          <AutoSetting width={50} height={50} />
          <Text style={{ position: "absolute" }}>💣</Text>
        </AutoWrapper>
      )}
      <Label>
        {type === "charge" ? "보유 중인 펑 : 300개" : "펑 자동충전"}
      </Label>
      <ChargeButton type={type} onPress={onPress || (() => {})} />
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  height: 70px;
  padding: 10px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  border-radius: 8px;
  flex-direction: row;
`;

const AutoWrapper = styled(View)`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;
const Label = styled(Text)`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.common.white};
  margin-right: auto;
`;

const Circle = styled(View)`
  width: 50px;
  height: 50px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.stroke.normal};
  margin-right: 10px;
  justify-content: center;
  align-items: center;
`;
