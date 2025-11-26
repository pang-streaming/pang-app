import styled from "styled-components";


import { CardInfoField } from "../../ui/card-info-field";
import { CardInfo } from "@/entities/payment/type";
import { View } from "react-native";

interface CardInfoSectionProps {
  cardInfo: CardInfo;
  onCardInfoChange: (cardInfo: CardInfo) => void;
}

export const CardInfoSection = ({ cardInfo, onCardInfoChange }: CardInfoSectionProps) => {
  const handleFieldChange = (field: string, value: string | string[]) => {
    if (field === 'card-num' && Array.isArray(value)) {
      onCardInfoChange({
        ...cardInfo,
        cardNumber: value.join('')
      });
    } else if (field === 'expiry-date' && Array.isArray(value)) {
      onCardInfoChange({
        ...cardInfo,
        expiryMonth: value[0] || '',
        expiryYear: value[1] || ''
      });
    } else if (typeof value === 'string') {
      const fieldName = field === 'phone-num' ? 'phoneNumber' : field;
      onCardInfoChange({
        ...cardInfo,
        [fieldName]: value
      });
    }
  };

  return (
    <Container>
      <CardInfoField
        type="name"
        value={cardInfo.name}
        onChange={(value) => handleFieldChange('name', value)}
      />
      <CardInfoField
        type="card-num"
        value={[
          cardInfo.cardNumber.slice(0, 4) || '',
          cardInfo.cardNumber.slice(4, 8) || '',
          cardInfo.cardNumber.slice(8, 12) || '',
          cardInfo.cardNumber.slice(12, 16) || ''
        ]}
        onChange={(value) => handleFieldChange('card-num', value)}
      />

      <Row>
        <CardInfoField
          type="expiry-date"
          value={[cardInfo.expiryMonth, cardInfo.expiryYear]}
          onChange={(value) => handleFieldChange('expiry-date', value)}
        />
        <CardInfoField
          type="card-pw"
          value={cardInfo.password}
          onChange={(value) => handleFieldChange('password', value)}
        />
      </Row>

      <Row>
        <CardInfoField
          type="owner"
          value={cardInfo.owner}
          onChange={(value) => handleFieldChange('owner', value)}
        />
        <CardInfoField
          type="phone-num"
          value={cardInfo.phoneNumber}
          onChange={(value) => handleFieldChange('phone-num', value)}
        />
      </Row>

      <CardInfoField
        type="birth"
        value={cardInfo.birth}
        onChange={(value) => handleFieldChange('birth', value)}
      />
    </Container>
  );
};

const Container = styled(View)`
  padding: 18px 15px;
  border-radius: ${({ theme }) => theme.borders.large};
  border: 1px solid ${({ theme }) => theme.colors.content.normal};
  flex-direction: column;
  gap: 20px;
`;

const Row = styled(View)`
flex-direction: row;
  gap: 10px;
  width: 100%;
`;
