

import { paymentIcons } from "@/assets/payments/_index"
import * as S from './style'
import { useEffect, useState } from "react";
import { paymentApi } from "@/entities/payment/api";
import { CardListItem } from "@/entities/payment/type";
import { CardElem } from "../../ui/card-elem";

import React from "react";
import { SvgProps } from "react-native-svg";

export interface CardData {
  id: string;
  image: React.FC<SvgProps>;
  cardName: string;
}

interface CardListSectionProps {
  refreshTrigger?: number;
  selectedCardId?: string;
  onCardSelect?: (cardId: string) => void;
}

export const CardListSection = ({ refreshTrigger, selectedCardId, onCardSelect }: CardListSectionProps) => {
  const [apiCards, setApiCards] = useState<CardListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<CardData[]>([]);

  // 카드 제공업체명을 아이콘으로 매핑하는 함수
  const getCardIcon = (provider: string): React.FC<SvgProps> => {
    const providerLower = provider.toLowerCase();
    if (providerLower.includes('kb') || providerLower.includes('국민')) return paymentIcons.kbank;
    if (providerLower.includes('kakao') || providerLower.includes('카카오')) return paymentIcons.kakaobank;
    if (providerLower.includes('toss') || providerLower.includes('토스')) return paymentIcons.tossbank;
    if (providerLower.includes('신한') || providerLower.includes('shinhan')) return paymentIcons.sinhanbank;
    // 기본 아이콘 (예시로 신한카드 아이콘 사용)
    return paymentIcons.sinhanbank;
  };

  const handleCardSelect = (cardId: string) => {
    onCardSelect?.(cardId);
  };

  // API 데이터를 CardData 형식으로 변환하고 cards 상태 업데이트
  useEffect(() => {
    if (apiCards.length > 0) {
      const mappedCardData: CardData[] = apiCards.map((card) => ({
        id: card.cardId,
        image: getCardIcon(card.provider),
        cardName: card.name
      }));
      console.log('Mapped card data:', mappedCardData);
      setCards(mappedCardData);
    } else {
      setCards([]);
    }
  }, [apiCards]);

  // 카드 목록을 API에서 가져오는 함수
  const fetchCards = async () => {
    try {
      setIsLoading(true);
      const response = await paymentApi.getCards();
      console.log('API response:', response.data);
      setApiCards(response.data);
    } catch (error) {
      console.error('카드 목록 조회 실패:', error);
      setApiCards([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트시와 refreshTrigger 변경시 카드 목록 조회
  useEffect(() => {
    fetchCards();
  }, [refreshTrigger]);

  return (
    <S.Container>
      <S.Title>카드 목록</S.Title>
      <S.CardListContainer>
        {isLoading ? (
          <S.LoadingText>카드 목록을 불러오는 중...</S.LoadingText>
        ) : cards.length === 0 ? (
          <S.EmptyText>등록된 카드가 없습니다.</S.EmptyText>
        ) : (
          <>
            {cards.map((card) => (
              <CardElem
                key={card.id}
                id={card.id}
                image={card.image}
                cardName={card.cardName}
                isSelected={selectedCardId === card.id}
                onSelect={handleCardSelect}
              />
            ))}
          </>
        )}
      </S.CardListContainer>
    </S.Container>
  );
};