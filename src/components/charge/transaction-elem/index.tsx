import { Text, View } from "react-native";
import styled from "styled-components/native";
import type { ThemeProps } from "@/theme/types";
import type { Transaction } from "@/entities/transaction/type";

interface TransactionElemProps {
  transaction: Transaction;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const getTransactionTypeLabel = (type: Transaction["type"]): string => {
  switch (type) {
    case "CHARGE":
      return "펑 충전";
    case "USE":
      return "펑 사용";
    default:
      return "거래";
  }
};

export const TransactionElem = ({ transaction }: TransactionElemProps) => {
  const isCharge = transaction.type === "CHARGE";
  
  return (
    <Container>
      <IconContainer>
        <IconText>
          {isCharge ? "➕" : "➖"}
        </IconText>
      </IconContainer>
      <InfoSection>
        <Title>{getTransactionTypeLabel(transaction.type)}</Title>
        <DateText>{formatDate(transaction.createdAt)}</DateText>
        {transaction.description && (
          <Description>{transaction.description}</Description>
        )}
      </InfoSection>
      <AmountSection>
        <AmountText isCharge={isCharge}>
          {isCharge ? "+" : "-"}
          {transaction.amount.toLocaleString()}개
        </AmountText>
      </AmountSection>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  padding: 16px 20px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }: ThemeProps) => theme.colors.border.light};
`;

const IconContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${({ theme }: ThemeProps) => theme.colors.content.normal};
  justify-content: center;
  align-items: center;
`;

const IconText = styled.Text`
  font-size: 20px;
`;

const InfoSection = styled.View`
  flex: 1;
  gap: 4px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }: ThemeProps) => theme.colors.text.normal};
`;

const DateText = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
`;

const AmountSection = styled.View`
  align-items: flex-end;
`;

const Description = styled.Text`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }: ThemeProps) => theme.colors.text.subtitle};
  margin-top: 2px;
`;

const AmountText = styled.Text<{ isCharge: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme, isCharge }: ThemeProps & { isCharge: boolean }) =>
    isCharge ? theme.colors.status.positive : theme.colors.status.negative};
`;

