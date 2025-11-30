import { SubmitButton } from "@/ui/SubmitButton";
import { IncreaseField } from "@/widgets/charge/charge-modal/ui/increase-field";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

interface Props {
    onPress:() => void;
}

export const DonationSection = ({onPress}:Props) => {
    const [autoChargeAmount, setAutoChargeAmount] = useState(1000);
    return (
        <View style={{gap:20, paddingHorizontal:20}}>
    <Container>
      <TextArea />
      <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
      <Label>읽어주기</Label>
      <VoiceSelectorContainer onPress={onPress}>
        <VoiceSelectorLabel>학생회장</VoiceSelectorLabel>
      </VoiceSelectorContainer>
      </View>
    </Container>

<IncreaseField pungAmount={0} onPungChange={setAutoChargeAmount}></IncreaseField>
<View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Note underline={false}>내용을 확인했으며 펑 후원에 동의합니다.</Note>
        <Note underline={true}>안내보기</Note>
        </View>
        <SubmitButton>펑 후원하기</SubmitButton>
</View>
    )
}


const Container = styled(View)`
  width: 100%;
  margin-top: 20px;
  gap: 10px;
  flex-direction: column;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.large};
`;
const TextArea = styled(View)`
  width: 100%;
  height: 85px;
  border-radius: ${({ theme }) => theme.borders.large};
  background-color: ${({ theme }) => theme.colors.content.normal};
`;

const Label = styled(Text)`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.subtitle};
`;

const VoiceSelectorContainer = styled(TouchableOpacity)`
  width: 85px;
  height: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.content.normal};
  border-radius: ${({ theme }) => theme.borders.maximum};
`;

const VoiceSelectorLabel = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.normal};
`;

const Note = styled(Text)<{ underline: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.subtitle};
  text-decoration-line: ${({ underline }) =>
    underline ? "underline" : "none"};
`;
