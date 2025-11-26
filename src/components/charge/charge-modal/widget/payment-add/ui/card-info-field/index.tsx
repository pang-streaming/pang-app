import { Text, TextInput, View } from "react-native";
import styled from "styled-components/native";
import type { ThemeProps } from "@/theme/types";

interface Props {
  type: "name" | "card-num" | "expiry-date" | "card-pw" | "owner" | "phone-num" | "birth";
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

const typeLabels: Record<Props["type"], string> = {
  name: "이름",
  "card-num": "카드 번호",
  "expiry-date": "유효기간",
  "card-pw": "비밀번호 앞 2자리",
  owner: "소유자명",
  "phone-num": "전화번호",
  birth: "생년월일",
};

export const CardInfoField = ({ type, value, onChange }: Props) => {
  const handleCardNumberChange = (index: number, text: string): void => {
    const cardNumbers = Array.isArray(value) ? value : ["", "", "", ""];
    const newNumbers = [...cardNumbers];
    newNumbers[index] = text;
    onChange(newNumbers);
  };

  const handleExpiryDateChange = (index: number, text: string): void => {
    const expiryData = Array.isArray(value) ? value : ["", ""];
    const newExpiry = [...expiryData];
    newExpiry[index] = text;
    onChange(newExpiry);
  };

  const renderFields = () => {
    if (type === "card-num") {
      const cardNumbers = Array.isArray(value) ? value : ["", "", "", ""];
      return (
        <Row>
          {cardNumbers.map((num, index) => (
            <Input
              key={index}
              value={num}
              maxLength={4}
              onChangeText={(text: string) => handleCardNumberChange(index, text)}
            />
          ))}
        </Row>
      );
    }

    if (type === "expiry-date") {
      const expiryData = Array.isArray(value) ? value : ["", ""];
      return (
        <Row>
          <Input
            placeholder="MM"
            maxLength={2}
            value={expiryData[0]}
            onChangeText={(text: string) => handleExpiryDateChange(0, text)}
          />
          <Input
            placeholder="YY"
            maxLength={2}
            value={expiryData[1]}
            onChangeText={(text: string) => handleExpiryDateChange(1, text)}
          />
        </Row>
      );
    }

    return (
      <Input
        value={typeof value === "string" ? value : ""}
        onChangeText={(text: string) => onChange(text)}
        maxLength={type === "card-pw" ? 2 : type === "birth" ? 6 : undefined}
        placeholder={type === "birth" ? "YYMMDD" : undefined}
      />
    );
  };

  return (
    <Wrapper>
      <Title>{typeLabels[type]}</Title>
      {renderFields()}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex-direction: column;
  gap: 5px;
`;

const Row = styled.View`
  flex-direction: row;
  gap: 6px;
  width: 100%;
`;

const Input = styled(TextInput)<ThemeProps>`
  flex: 1;
  height: 40px;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
  border-radius: 6px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background.normal};
  padding: 12px 16px;
`;

const Title = styled(Text)<ThemeProps>`
  font-size: 8px;
  font-weight: 500;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
`;
