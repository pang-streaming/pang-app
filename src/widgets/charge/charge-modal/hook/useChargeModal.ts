import { useState } from "react";
import { paymentApi } from "@/entities/payment/api";

export type ChargeModalType = "pung-charge" | "payment-choice" | "payment-add" | "auto-charge";

export const useChargeModal = (initialType: ChargeModalType, onClose?: () => void) => {
  const [currentType, setCurrentType] = useState<ChargeModalType>(initialType);
  const [pungAmount, setPungAmount] = useState(1000);
  const [cardRefreshTrigger, setCardRefreshTrigger] = useState(0);

  const handlePungChange = (amount: number) => {
    setPungAmount(amount);
  };

  const handleToPaymentChoice = () => {
    setCurrentType("payment-choice");
  };

  const handleToPaymentAdd = () => {
    setCurrentType("payment-add");
  };

  const handleBackToPaymentChoice = () => {
    setCurrentType("payment-choice");
  };

  const handleCardAdded = () => {
    setCardRefreshTrigger(prev => prev + 1);
  };

  const handleBackToPungCharge = () => {
    setCurrentType("pung-charge");
  };

  const handleCharge = async (cardId: string, amount: number) => {
    try {
      const result = await paymentApi.processPayment(cardId, amount);
      console.log('결제 성공:', result);

      if (onClose) {
        onClose();
      }

      alert(`결제가 완료되었습니다!`);

    } catch (error) {
      console.error('결제 실패:', error);
      alert('결제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return {
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
  };
};
