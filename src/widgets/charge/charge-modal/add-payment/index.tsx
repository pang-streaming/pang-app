import  { useState } from "react";
import styled from "styled-components";
import { paymentApi } from "@/entities/payment/api";
import { CardInfo } from "@/entities/payment/type";
import { isAxiosError } from "axios";
import { CardInfoSection } from "../select-card/widgets/card-info-section";
import { SubmitButton } from "@/ui/SubmitButton";
import { View } from "react-native";

interface Props {
  onBackToPaymentChoice: () => void;
  onCardAdded?: () => void;
}

export const AddPayment = ({ onBackToPaymentChoice, onCardAdded }: Props) => {
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    name: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    password: '',
    owner: '',
    phoneNumber: '',
    birth: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await paymentApi.addCard(cardInfo);
      onCardAdded?.();
      onBackToPaymentChoice();
    } catch (error) {
      console.error('카드 등록 실패:', error);
      if (isAxiosError(error)) 
        alert(error.response?.data.message);
      return;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <CardInfoSection cardInfo={cardInfo} onCardInfoChange={setCardInfo} />
      <SubmitButton onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? '등록 중...' : '카드 등록하기'}
      </SubmitButton>
    </Container>
  );
};

const Container = styled(View)`

  gap: 15px;
  flex-direction: column;
`;
