

import React from 'react'
import * as S from './style'
import { useChargeModal } from './hook/useChargeModal';
import { ChargeModalHeader } from './widgets/charge-modal-header';
import { PungCharge } from './pung-charge';
import { SelectCard } from './select-card';
import { AddPayment } from './add-payment';
import { AutoCharge } from './auto-charge';


interface Props {
    initialType?: "pung-charge" | "payment-choice" | "payment-add" | "auto-charge";
    chargeType?: "mypung" | "autochargepung";
    onClose?: () => void;
  }

  export const ChargeModal = ({ initialType = "pung-charge", chargeType = "mypung", onClose }: Props) => {
    const {
      currentType,
      pungAmount,
      cardRefreshTrigger,
      handlePungChange,
      handleToPaymentChoice,
      handleToPaymentAdd,
      handleBackToPaymentChoice,
      handleCardAdded,
      handleBackToPungCharge,
      handleCharge,
    } = useChargeModal(initialType, onClose);
  return (
    <S.Container onPress={(e) => e.stopPropagation()}>
      <ChargeModalHeader onClose={onClose}>
        {currentType === "auto-charge"
          ? "펑 자동충전"
          : currentType === "pung-charge"
          ? "펑 충전하기"
          : currentType === "payment-choice"
            ? "결제수단 선택"
            : "결제수단 추가"}
      </ChargeModalHeader>
      <S.Content>
        {currentType === "auto-charge" ? (
          <AutoCharge onClose={onClose} />
        ) : currentType === "pung-charge" ? (
          <PungCharge pungAmount={pungAmount} onPungChange={handlePungChange} toPaymentChoice={handleToPaymentChoice} />
        ) : currentType === "payment-choice" ? (
          <SelectCard pungAmount={pungAmount} toPaymentAdd={handleToPaymentAdd} onBackToPungCharge={handleBackToPungCharge} onCardAdded={handleCardAdded} cardRefreshTrigger={cardRefreshTrigger} onCharge={handleCharge} />
        ) : (
          <AddPayment onBackToPaymentChoice={handleBackToPaymentChoice} onCardAdded={handleCardAdded} />
        )}
      </S.Content>
    </S.Container>
  )
}


